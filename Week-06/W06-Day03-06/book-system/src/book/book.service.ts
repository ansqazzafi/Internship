import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dto/createbook.dto';
import { Author, AuthorDocument } from 'src/author/author.schema';
import { SuccessHandler } from 'src/interface/response.interface';
import { ResponseHandler } from 'src/utility/success.response';
import { UpdateBookDto } from 'src/dto/updatebook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    private readonly responseHandler: ResponseHandler,
  ) {}

  async onModuleInit() {
    await this.bookModel.createIndexes();
  }

  public async createBook(
    createBookDto: CreateBookDto,
  ): Promise<SuccessHandler<Book>> {
    const session = await this.bookModel.db.startSession();
    session.startTransaction();

    try {
      const createdBook = new this.bookModel({ ...createBookDto });
      await createdBook.save({ session });

      const author = await this.authorModel.findByIdAndUpdate(
        createBookDto.authorId,
        { $push: { Books: createdBook._id } },
        { session, new: true },
      );

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      await session.commitTransaction();

      return this.responseHandler.successHandler(
        createdBook,
        'Book created successfully',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      await session.abortTransaction();

      throw new Error(
        'There was an error while creating the book: ' + error.message,
      );
    } finally {
      session.endSession();
    }
  }

  public async updateBook(
    bookId: string,
    updateBookDto: UpdateBookDto,
  ): Promise<SuccessHandler<Book>> {
    try {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        bookId,
        { $set: updateBookDto },
        { new: true },
      );

      if (!updatedBook) {
        throw new NotFoundException('Book not found');
      }
      return this.responseHandler.successHandler(
        updatedBook,
        'Book updated successfully',
      );
    } catch (error) {
      throw new Error('Error during updating the book: ' + error.message);
    }
  }

  public async getAllBooks(
    page: number,
    limit: number,
  ): Promise<SuccessHandler<Book[]>> {
    try {
      const skip = (page - 1) * limit;
      const books = await this.bookModel.find().skip(skip).limit(limit);
      const totalCount = await this.bookModel.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      if (books.length === 0) {
        throw new ForbiddenException('No books available.');
      }
      return this.responseHandler.successHandler(
        {
          books,
          pagination: {
            page,
            limit,
            totalBooks: totalCount,
            totalPages,
          },
        },
        'Books fetched successfully.',
      );
    } catch (error) {
      console.error('Error during fetching books:', error);
      throw new Error('Error during fetching all the books.');
    }
  }

  public async getBook(bookId: string): Promise<SuccessHandler<Book>> {
    try {
      const book = await this.bookModel.findById(bookId);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return await this.responseHandler.successHandler(
        book,
        'Book fetched with given id',
      );
    } catch (error) {
      throw new Error('Error during getting book');
    }
  }

  public async deleteBook(bookId: string): Promise<SuccessHandler<Book>> {
    const session = await this.bookModel.db.startSession();
    session.startTransaction();
    try {
      const deletedBook = await this.bookModel
        .findByIdAndDelete(bookId)
        .session(session);

      if (!deletedBook) {
        throw new NotFoundException('Book not found');
      }

      const authorUpdate = await this.authorModel.findByIdAndUpdate(
        deletedBook.authorId,
        { $pull: { Books: deletedBook._id } },
        { session, new: true },
      );

      if (!authorUpdate) {
        throw new NotFoundException(
          'Author not found or book not associated with author',
        );
      }

      await session.commitTransaction();

      return this.responseHandler.successHandler(
        deletedBook,
        'Book deleted successfully',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      await session.abortTransaction();
      throw new Error('Error during deleting the book: ' + error.message);
    } finally {
      session.endSession();
    }
  }

  public async searchBooks(
    searchTerm: string,
    genre?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<SuccessHandler<Book[]>> {
    console.log(searchTerm, genre, page, limit, 'dffd');

    try {

        // <Here are using full text search>
      const aggregation = await this.bookModel.aggregate([
        {
          $match: {
            $text: { $search: searchTerm },
            ...(genre && { genre: genre.toUpperCase() }),
          },
        },
        {
          $facet: {
            books: [{ $skip: (page - 1) * limit }, { $limit: limit }],
            totalCount: [{ $count: 'count' }],
          },
        },
      ]);

      // <it was used when indexing are applied on book title >
      //   const aggregation = await this.bookModel.aggregate([
      //     {
      //         $match: {
      //             $and: [
      //                 {
      //                     BookTitle: {
      //                         $regex: search,
      //                         $options: 'i',
      //                     },
      //                 },
      //                 genre && {
      //                     genre: genre.toUpperCase(),

      //                 },
      //             ],
      //         },
      //     },
      //     {
      //         $facet: {
      //             books: [
      //                 { $skip: (page - 1) * limit },
      //                 { $limit: limit },
      //             ],
      //             totalCount: [
      //                 { $count: "count" }
      //             ],
      //         },
      //     },
      // ]);

      const books = aggregation[0]?.books || [];
      const totalCount = aggregation[0]?.totalCount[0]?.count || 0;
      const totalPages = Math.ceil(totalCount / limit);

      if (books.length === 0) {
        throw new NotFoundException('No books found with the given title.');
      }

      return await this.responseHandler.successHandler(
        {
          books,
          pagination: {
            page,
            limit,
            totalBooks: totalCount,
            totalPages,
          },
        },
        'Books with the given title have been fetched successfully.',
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error during book search:', error);
      throw new Error('Error occurred while searching for books.');
    }
  }


  async getTotalBooksByGenre(): Promise<any> {
    try {
      const aggregation = await this.bookModel.aggregate([
        {
          $group: {
            _id: '$genre', 
            totalBooks: { $sum: 1 }, 
          },
        },
        {
          $sort: { totalBooks: -1 }, 
        },
      ]);
  
      return this.responseHandler.successHandler(aggregation , 'Books grouped based on genre')
    } catch (error) {
      console.error('Error fetching books by genre:', error);
      throw new Error('Failed to fetch books by genre.');
    }
  }
  
}
