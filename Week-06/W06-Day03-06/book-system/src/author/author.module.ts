import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './author.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorController } from './author.controller';
import { ResponseHandler } from 'src/utility/success.response';
@Module({
    imports:[
        MongooseModule.forFeature([{name:Author.name , schema:AuthorSchema}])
    ],
    controllers:[AuthorController],
    providers:[AuthorService , ResponseHandler]
})
export class AuthorModule {}
