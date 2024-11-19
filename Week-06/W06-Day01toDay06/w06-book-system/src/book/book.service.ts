import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dto/createbook.dto';
import { Author, AuthorDocument } from 'src/author/author.schema';
import { AuthorService } from 'src/author/author.service';
import { UpdateBookDto } from 'src/dto/updatebook.dto';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        private readonly authorService: AuthorService
    ) { }

    public async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const authorFormat = {
            authorName: createBookDto.authorName,
            authorEmail: createBookDto.authorEmail,
            bio: createBookDto.bio,
            nationality: createBookDto.nationality,
        };

        const bookFormat = {
            title: createBookDto.title,
            publishedDate: createBookDto.publishedDate,
        };

        let author:AuthorDocument = await this.authorModel.findOne({ authorEmail: authorFormat.authorEmail });
        if (!author) {
            author = await this.authorService.createAuthor(authorFormat);
            if (!author) {
                throw new ConflictException('Could not create author.');
            }
        }

        const createdBook = new this.bookModel({
            ...bookFormat,
            authorId: author._id,
        });

        await createdBook.save();

        return createdBook;
    }

    public async getBookWithAuthor(bookId: string): Promise<Book> {
        try {
          const book = await this.bookModel
            .findById(bookId)   
            .populate('authorId') 
            .exec();  
    
          if (!book) {
            throw new Error('Book not found');
          }
    
          return book;  
        } catch (error) {
          throw new Error('Error retrieving book with author: ' + error.message);
        }
      }


      public async updateBook(bookId:string , updateBookDto:UpdateBookDto):Promise<Book>{
        const updatedBook = await this.bookModel.findOneAndUpdate(
            { _id: bookId },  
            { $set: updateBookDto },  
            { new: true, runValidators: true }  
          );
    
          if (!updatedBook) {
            throw new NotFoundException(`Book with ID ${bookId} not found.`);
          }
    
          return updatedBook;
      }
}
