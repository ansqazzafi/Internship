import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './author.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { ResponseHandler } from 'src/utility/success.response';
import { Book , BookSchema } from 'src/book/book.schema';
@Module({
    imports:[
        MongooseModule.forFeature([{name:Author.name , schema:AuthorSchema}]),
        MongooseModule.forFeature([{name:Book.name , schema:BookSchema}]),
    ],
    controllers:[AuthorController],
    providers:[AuthorService , ResponseHandler]
})
export class AuthorModule {}
