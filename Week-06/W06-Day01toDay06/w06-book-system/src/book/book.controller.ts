import { Body, Controller , Get , Post  ,Patch , Param} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { CreateBookDto } from 'src/dto/createbook.dto';
import { UpdateBookDto } from 'src/dto/updatebook.dto';
@Controller('api/book')
export class BookController {
    constructor(private readonly bookService:BookService){}

    @Post('create-book')
    public async createBook(@Body() createBookDto:CreateBookDto):Promise<Book>{
        console.log("create :" , createBookDto);
        return await this.bookService.createBook(createBookDto)
    }

    @Get('get-book/:bookId')
  public async getBook(@Param('bookId') bookId: string): Promise<Book> {
    return await this.bookService.getBookWithAuthor(bookId); 
  }


  @Patch('update-book/:bookId')
  public async updateBook(@Param('bookId') bookId:string , @Body() UpdateBookDto:UpdateBookDto):Promise<Book>{
    return await this.bookService.updateBook(bookId , UpdateBookDto)
  }
}
