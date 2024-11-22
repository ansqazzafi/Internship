import { Body, Controller, Get, Post, Patch, Param, Query, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { CreateBookDto } from 'src/dto/createbook.dto';
import { UpdateBookDto } from 'src/dto/updatebook.dto';
import { SuccessHandler } from 'src/interface/response.interface';
@Controller('api/v2/books')
export class BookController {
  constructor(private readonly bookService: BookService) { }
  @Get()
  public async getBooks(
    @Query('search') search: string,
    @Query('genre') genre?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<SuccessHandler<Book[]>> {
    if (search) {
      page = Number(page);
      limit = Number(limit);
      console.log(search, genre, page, limit, "search params");
      return this.bookService.searchBooks(search, genre, page, limit);
    } else {
      console.log("Fetching all books");
      return this.bookService.getAllBooks(page, limit);
    }
  }
  
  @Get(':bookId')
  public async getBook(@Param('bookId') bookId: string): Promise<SuccessHandler<Book>> {
    return await this.bookService.getBook(bookId)
  }
  @Post()
  public async createBook(@Body() createBookDto: CreateBookDto): Promise<SuccessHandler<Book>> {
    console.log("create :", createBookDto);
    return await this.bookService.createBook(createBookDto)
  }
  @Patch(':bookId')
  public async updateBook(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto): Promise<SuccessHandler<Book>> {
    return await this.bookService.updateBook(bookId, updateBookDto)
  }
  @Delete(':bookId')
  public async deleteBook(@Param('bookId') bookId: string): Promise<SuccessHandler<Book>> {
    return await this.bookService.deleteBook(bookId)
  }
}
