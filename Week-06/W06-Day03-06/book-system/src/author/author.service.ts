  import {
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Author, AuthorDocument } from './author.schema';
  import { Model } from 'mongoose';
  import { createAuthorDto } from '../dto/createauthor.dto';
  import { ResponseHandler } from '../utility/success.response';
  import { SuccessHandler } from '../interface/response.interface';
  import { UpdateAuthorDto } from '../dto/updateauthor.dto';
  import { BookDocument, Book } from '../book/book.schema';
  import { Nationality } from '../enums/nationality.enum';
  @Injectable()
  export class AuthorService {
    constructor(
      @InjectModel(Author.name)
      private readonly authorModel: Model<AuthorDocument>,
      @InjectModel(Book.name) private bookModel: Model<BookDocument>,
      private readonly responseHandler: ResponseHandler,
    ) {}

    public async createAuthor(
      createAuthorDto: createAuthorDto,
    ): Promise<SuccessHandler<Author>> {
      console.log(createAuthorDto, 'service');
      try {
        const createdAuthor = new this.authorModel({
          ...createAuthorDto,
        });
        await createdAuthor.save();
        return this.responseHandler.successHandler(
          createdAuthor,
          'Author created successfully',
        );
      } catch (error) {
        console.error('Error creating author:', error);
        throw new Error('Error creating author: ' + error.message);
      }
    }

    public async getAuthors(): Promise<SuccessHandler<Author[]>> {
      try {
        const authors = await this.authorModel.find();
        if (authors.length === 0) {
          throw new ConflictException('No Author exist');
        }
        return this.responseHandler.successHandler(
          authors,
          'Authors fetched successfully!',
        );
      } catch (error) {
        if (error instanceof ConflictException) {
          throw error;
        }
        console.error('Error creating author:', error);
        throw new Error('Error fetching author: ' + error.message);
      }
    }
    public async getAuthor(authorId: string): Promise<SuccessHandler<Author>> {
      try {
        const author = await this.authorModel.findById(authorId);
        if (!author) {
          throw new NotFoundException('No Author exist with Given ID');
        }
        return this.responseHandler.successHandler(
          author,
          'Author fetched Sucessfully with given id',
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error('Error creating author:', error);
        throw new Error('Error fetching author: ' + error.message);
      }
    }

    public async updateAuthor(
      authorId: string,
      updateAuthorDto: UpdateAuthorDto,
    ): Promise<SuccessHandler<Author>> {
      console.log(authorId, updateAuthorDto, 'gfsdsg');
      try {
        const updatedAuthor = await this.authorModel.findByIdAndUpdate(
          authorId,
          {
            $set: { ...UpdateAuthorDto }, 
            ...(updateAuthorDto.nationality && { 
              $addToSet: { nationality: { $each: updateAuthorDto.nationality } }
            }),
            ...(updateAuthorDto.deleteNationality && { 
              $pull: { nationality: { $in: updateAuthorDto.deleteNationality } }
            }),
            
          },
          { new: true, runValidators: true }
        );

        console.log(updatedAuthor, 'UpdatedAuthor');

        if (!updatedAuthor) {
          throw new NotFoundException('Author not found');
        }

        return this.responseHandler.successHandler(
          updatedAuthor,
          'Author updated successfully',
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }

        throw new Error('Something went wrong during the update');
      }
    }

    public async getAuthorsByName(
      search: string,
      nationality?: Nationality,
    ): Promise<SuccessHandler<Author[]>> {
      try {
        console.log(search);

        const authors = await this.authorModel
          .aggregate([
            {
              $match: {
                $and: [
                  { authorName: { $regex: search, $options: 'i' } },
                  ...(nationality && [{ nationality: { $in: [nationality] } }]),
                ],
              },
            },
          ])
          .exec();

        if (authors.length === 0) {
          throw new NotFoundException(
            `No authors found with the name "${search}"`,
          );
        }

        return this.responseHandler.successHandler(
          authors,
          'Authors fetched successfully',
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        throw new Error(
          'There was an error during fetching authors: ' + error.message,
        );
      }
    }

    public async deleteAuthorAndBooks(
      authorId: string,
    ): Promise<SuccessHandler<Author>> {
      const session = await this.bookModel.db.startSession();
      session.startTransaction();
      try {
        console.log('Entereddd :', authorId);
        const author = await this.authorModel.findById(authorId).session(session);
        if (!author) {
          throw new NotFoundException('Author not found');
        }
        console.log('Auther Found:', author);

        const bookIds = author.Books;
        if (!bookIds || bookIds.length === 0) {
          console.log('No books associated with this author, deleting author');
          const deletedAuthor = await this.authorModel.findByIdAndDelete(
            authorId,
            { session },
          );
          if (!deletedAuthor) {
            throw new NotFoundException('Failed to delete author');
          }
        } else {
          const deletedAuthor = await this.authorModel.findByIdAndDelete(
            authorId,
            { session },
          );
          if (!deletedAuthor) {
            throw new NotFoundException('Failed to delete author');
          }
          await this.bookModel.deleteMany({ _id: { $in: bookIds } }, { session });
        }
        await session.commitTransaction();
        return this.responseHandler.successHandler(
          Author,
          'Author and associated books deleted successfully',
        );
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        await session.abortTransaction();
        console.error('Error during author and books deletion:', error);
        throw new Error(
          'Error during deleting the author and associated books: ' +
            error.message,
        );
      } finally {
        session.endSession();
      }
    }
  }
