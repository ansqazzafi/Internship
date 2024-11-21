import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dto/createbook.dto';
import { Author, AuthorDocument } from 'src/author/author.schema';
import { AuthorService } from 'src/author/author.service';
import { SuccessHandler } from 'src/interface/response.interface';
import { ResponseHandler } from 'src/utility/success.response';
import { UpdateBookDto } from 'src/dto/updatebook.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        private readonly responseHandler: ResponseHandler,
    ) { }

    public async createBook(createBookDto: CreateBookDto): Promise<SuccessHandler<Book>> {
        const session = await this.bookModel.db.startSession();
        session.startTransaction();

        try {
            const createdBook = new this.bookModel({ ...createBookDto });
            await createdBook.save({ session });

            const author = await this.authorModel.findByIdAndUpdate(
                createBookDto.authorId,
                { $push: { Books: createdBook._id } },
                { session, new: true }
            );

            if (!author) {
                throw new NotFoundException('Author not found');
            }

            await session.commitTransaction();

            return this.responseHandler.successHandler(createdBook, 'Book created successfully');
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }

            await session.abortTransaction();

            throw new Error('There was an error while creating the book: ' + error.message);
        } finally {
            session.endSession();
        }
    }

    public async updateBook(bookId: string, updateBookDto: UpdateBookDto): Promise<SuccessHandler<Book>> {
        try {
            const updatedBook = await this.bookModel.findByIdAndUpdate(
                bookId,
                { $set: updateBookDto },
                { new: true }
            );

            if (!updatedBook) {
                throw new NotFoundException('Book not found');
            }
            return this.responseHandler.successHandler(updatedBook, 'Book updated successfully');
        } catch (error) {
            throw new Error('Error during updating the book: ' + error.message);
        }
    }


    public async getAllBooks(): Promise<SuccessHandler<Book[]>> {
        try {

            const books = await this.bookModel.find().populate('authorId')
            if (books.length === 0) {
                throw new ForbiddenException("Books doesnt exists")
            }

            return this.responseHandler.successHandler(books, "Books Fetched Sucessfully")

        } catch (error) {
            throw new Error("Error during fetching all the books")
        }

    }


    public async getBook(bookId: string): Promise<SuccessHandler<Book>> {
        try {
            const book = await this.bookModel.findById(bookId)
            if (!book) {
                throw new NotFoundException("Book not found")
            }
            return await this.responseHandler.successHandler(book, "Book fetched with given id")
        } catch (error) {
            throw new Error("Error during getting book")
        }
    }


    public async deleteBook(bookId: string): Promise<SuccessHandler<Book>> {
        const session = await this.bookModel.db.startSession();
        session.startTransaction();
        try {
            const deletedBook = await this.bookModel.findByIdAndDelete(bookId);
    
            if (!deletedBook) {
                throw new NotFoundException('Book not found');
            }
            const authorUpdate = await this.authorModel.findByIdAndUpdate(
                deletedBook.authorId,  
                { $pull: { Books: bookId } },  
                { session, new: true }  
            );
    
            if (!authorUpdate) {
                throw new NotFoundException('Author not found or book not associated with author');
            }
    
            await session.commitTransaction();
    
            return this.responseHandler.successHandler(deletedBook, 'Book deleted successfully');
        } catch (error) {

            await session.abortTransaction();
            throw new Error('Error during deleting the book: ' + error.message);
        } finally {
            session.endSession();
        }




    }

}
