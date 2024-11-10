import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Book } from './books.model';
import { User } from 'src/auth/user.model';
import { Types } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let bookModel: any;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            countDocuments: jest.fn(),
            deleteOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getModelToken(User.name),
          useValue: {
            findById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get(getModelToken(Book.name));
    userModel = module.get(getModelToken(User.name));
  });

  describe('createBook', () => {
    it('should create a new book and return a success message', async () => {
      const createBookDto = {
        bookName: 'Test Book',
        bookDescription: 'Test Description',
        authorName: 'Test Author',
        publishedDate: '2024-01-01',
        genre: 'FICTION', // assuming GenreEnum.FICTION is valid
        numberOfCopiesAvailable: 5,
      };

      const mockBook = {
        ...createBookDto,
        save: jest.fn().mockResolvedValue(true),
      };

      bookModel.create.mockResolvedValue(mockBook);

      const result = await service.createBook(createBookDto);

      expect(result.message).toBe('Book created Successfully');
      expect(result.Book.bookName).toBe(createBookDto.bookName);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const updateBookDto = {
        bookName: 'Updated Test Book',
      };

      const mockBook = {
        ...updateBookDto,
        save: jest.fn().mockResolvedValue(true),
      };

      bookModel.findById.mockResolvedValue(mockBook);

      const result = await service.updateBook(updateBookDto, 'bookId');

      expect(result.message).toBe('Book updated Succesfully');
      expect(result.Book.bookName).toBe(updateBookDto.bookName);
    });

    it('should throw error if book not found', async () => {
      bookModel.findById.mockResolvedValue(null);

      await expect(service.updateBook({ bookName: 'Test Book' }, 'nonexistentId'))
        .rejects
        .toThrowError('Book not found');
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const mockBook = { bookName: 'Test Book', save: jest.fn().mockResolvedValue(true) };
      bookModel.findById.mockResolvedValue(mockBook);
      bookModel.deleteOne.mockResolvedValue(true);

      const result = await service.deleteBook('bookId');
      expect(result.message).toBe('Book deleted successfully');
    });

    it('should throw error if book not found', async () => {
      bookModel.findById.mockResolvedValue(null);

      await expect(service.deleteBook('nonexistentId'))
        .rejects
        .toThrowError('Book not found');
    });
  });

  describe('listBooks', () => {
    it('should list books with pagination', async () => {
      const paginationParams = { page: 1, limit: 5 };
      const mockBooks = [
        { bookName: 'Test Book 1' },
        { bookName: 'Test Book 2' },
      ];

      bookModel.find.mockResolvedValue(mockBooks);
      bookModel.countDocuments.mockResolvedValue(10);

      const result = await service.listBooks(paginationParams);

      expect(result.data.length).toBe(2);
      expect(result.total).toBe(10);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(5);
    });
  });

  describe('borrowBook', () => {
    it('should borrow a book for a user', async () => {
      const userId = 'userId';
      const bookId = 'bookId';

      const mockUser = {
        _id: userId,
        borrowedBooks: [],
        save: jest.fn().mockResolvedValue(true),
      };

      const mockBook = {
        _id: bookId,
        numberOfCopiesAvailable: 3,
        borrowedBy: [],
        save: jest.fn().mockResolvedValue(true),
      };

      userModel.findById.mockResolvedValue(mockUser);
      bookModel.findById.mockResolvedValue(mockBook);

      const result = await service.borrowBook(userId, bookId);

      expect(result).toBe(`User ${mockUser.firstName} successfully Borrowed the book with ID: ${bookId}`);
    });

    it('should throw error if user has already borrowed the book', async () => {
      const userId = 'userId';
      const bookId = 'bookId';

      const mockUser = {
        _id: userId,
        borrowedBooks: [bookId],
      };

      userModel.findById.mockResolvedValue(mockUser);

      await expect(service.borrowBook(userId, bookId))
        .rejects
        .toThrowError('User has already borrowed this book');
    });

    it('should throw error if book is out of stock', async () => {
      const userId = 'userId';
      const bookId = 'bookId';

      const mockUser = {
        _id: userId,
        borrowedBooks: [],
      };

      const mockBook = {
        _id: bookId,
        numberOfCopiesAvailable: 0,
      };

      userModel.findById.mockResolvedValue(mockUser);
      bookModel.findById.mockResolvedValue(mockBook);

      await expect(service.borrowBook(userId, bookId))
        .rejects
        .toThrowError('Book are not available yet');
    });
  });

  describe('returnBook', () => {
    it('should return a borrowed book', async () => {
      const userId = 'userId';
      const bookId = 'bookId';

      const mockUser = {
        _id: userId,
        borrowedBooks: [bookId],
        save: jest.fn().mockResolvedValue(true),
      };

      const mockBook = {
        _id: bookId,
        numberOfCopiesAvailable: 3,
        borrowedBy: [userId],
        save: jest.fn().mockResolvedValue(true),
      };

      userModel.findById.mockResolvedValue(mockUser);
      bookModel.findById.mockResolvedValue(mockBook);

      const result = await service.returnBook(userId, bookId);

      expect(result).toBe(`User ${mockUser.firstName} successfully returned the book with ID: ${bookId}`);
    });

    it('should throw error if user did not borrow the book', async () => {
      const userId = 'userId';
      const bookId = 'bookId';

      const mockUser = {
        _id: userId,
        borrowedBooks: [],
      };

      const mockBook = {
        _id: bookId,
        borrowedBy: [],
      };

      userModel.findById.mockResolvedValue(mockUser);
      bookModel.findById.mockResolvedValue(mockBook);

      await expect(service.returnBook(userId, bookId))
        .rejects
        .toThrowError('User did not borrow this book');
    });
  });
});
