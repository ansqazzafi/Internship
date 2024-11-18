import { Controller , Get } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
@Controller('book')
export class BookController {
    constructor(private readonly bookService:BookService){}
    @Get('books')
    public async allBooks():Promise<Book[]>{
        return this.bookService.allBooks()
    }
}
