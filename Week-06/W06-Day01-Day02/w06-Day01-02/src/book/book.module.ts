import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Author , AuthorSchema } from 'src/author/author.schema';
import { AuthorService } from 'src/author/author.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Book.name , schema:BookSchema}]),
        MongooseModule.forFeature([{name:Author.name , schema:AuthorSchema}])
    ],
    controllers:[BookController],
    providers:[BookService , AuthorService]
})
export class BookModule {}
