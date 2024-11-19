import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './author.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports:[
        MongooseModule.forFeature([{name:Author.name , schema:AuthorSchema}])
    ],
    controllers:[],
    providers:[AuthorService]
})
export class AuthorModule {}
