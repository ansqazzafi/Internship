import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';
import { getModelToken } from '@nestjs/mongoose';
import { Author } from './author.schema';
import { Book } from '../book/book.schema';
import { ResponseHandler } from '../utility/success.response';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Nationality } from '../enums/nationality.enum';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createAuthorDto } from '../dto/createauthor.dto';
import { UpdateAuthorDto } from '../dto/updateauthor.dto';

// Create an instance of MongoMemoryServer
let mongoServer: MongoMemoryServer;
let authorModel: Model<Author>;
let bookModel: Model<Book>;
let authorService: AuthorService;

describe('AuthorService', () => {
  beforeAll(async () => {
    // Set up in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Set up NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        {
          provide: getModelToken(Author.name),
          useValue: mongoose.model(Author.name, new mongoose.Schema({
            authorName: String,
            authorEmail: String,
            bio: String,
            nationality: [String],
            Books: [mongoose.Schema.Types.ObjectId],
          })),
        },
        {
          provide: getModelToken(Book.name),
          useValue: mongoose.model(Book.name, new mongoose.Schema({
            title: String,
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
          })),
        },
        ResponseHandler,
      ],
    }).compile();

    // Get the models and the service
    authorModel = module.get<Model<Author>>(getModelToken(Author.name));
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
    authorService = module.get<AuthorService>(AuthorService);

    // Connect to the in-memory database
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clean up after each test
    await authorModel.deleteMany({});
    await bookModel.deleteMany({});
  });

  it('should be defined', () => {
    expect(authorService).toBeDefined();
  });

  describe('createAuthor', () => {
    it('should create a new author successfully', async () => {
      const createAuthorDto: createAuthorDto = {
        authorName: 'John Doe',
        authorEmail: 'john@example.com',
        bio: 'Author Bio',
        nationality: [Nationality.PAKISTAN],
      };

      const result = await authorService.createAuthor(createAuthorDto);
      expect(result.message).toBe('Author created successfully');
      expect(result.data.authorName).toBe('John Doe');
    });

    it('should throw an error if author creation fails', async () => {
      const createAuthorDto: createAuthorDto = {
        authorName: '',
        authorEmail: 'invalid-email',
        bio: 'Author Bio',
        nationality: [Nationality.PAKISTAN],
      };

      try {
        await authorService.createAuthor(createAuthorDto);
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  describe('getAuthors', () => {
    it('should return a list of authors', async () => {
      const createAuthorDto: createAuthorDto = {
        authorName: 'Jane Doe',
        authorEmail: 'jane@example.com',
        bio: 'Jane Bio',
        nationality: [Nationality.CANADA],
      };

      await authorService.createAuthor(createAuthorDto);
      const result = await authorService.getAuthors();
      expect(result.message).toBe('Authors fetched successfully!');
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should throw an error if no authors are found', async () => {
      try {
        await authorService.getAuthors();
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('No Author exist');
      }
    });
  });

  describe('getAuthor', () => {
    it('should return a specific author by ID', async () => {

      const createAuthorDto: createAuthorDto = {
        authorName: 'Jane Doe',
        authorEmail: 'jane@example.com',
        bio: 'Jane Bio',
        nationality: [Nationality.CANADA],
      };

      const authorId = '507f1f77bcf86cd799439011'
      await authorService.createAuthor(createAuthorDto);

      const result = await authorService.getAuthor(authorId);
      expect(result.message).toBe('Author fetched Sucessfully with given id');
    });

    it('should throw an error if author is not found', async () => {
      try {
        await authorService.getAuthor('674427b2e8cfe79eff927609');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('No Author exist with Given ID');
      }
    });
  });

  describe('updateAuthor', () => {
    it('should update an author successfully', async () => {
      const updateAuthorDto: UpdateAuthorDto = {
        authorName: 'Bob Dylan',
      };

      const result = await authorService.updateAuthor(
        "507f1f77bcf86cd799439011",
        updateAuthorDto,
      );

      expect(result.message).toBe('Author updated successfully');
      expect(result.data.authorName).toBe('Bob Dylan');
    });

    it('should throw an error if update fails', async () => {
      try {
        await authorService.updateAuthor('674427b2e8cfe79eff927609', {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Author not found');
      }
    });
  });

  describe('deleteAuthorAndBooks', () => {
    it('should delete an author and their associated books', async () => {
      const authorId = "507f1f77bcf86cd799439011";
      const result = await authorService.deleteAuthorAndBooks(authorId);
      expect(result.message).toBe('Author and associated books deleted successfully');
    });

    it('should throw an error if the author to delete is not found', async () => {
      try {
        await authorService.deleteAuthorAndBooks('674427b2e8cfe79eff927609');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Author not found');
      }
    });
  });
});
