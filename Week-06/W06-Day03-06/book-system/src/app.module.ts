import { Module } from '@nestjs/common';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book/book.schema';
import { AuthorService } from './author/author.service';
import { Author, AuthorSchema } from './author/author.schema';
import { AuthorModule } from './author/author.module';
import { AuthorController } from './author/author.controller';
import { ResponseHandler } from './utility/success.response';

@Module({
  imports: [BookModule , AuthorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), 
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{name:Book.name , schema:BookSchema}]),
    MongooseModule.forFeature([{name:Author.name , schema:AuthorSchema}])
  ],
  controllers: [BookController , AuthorController],
  providers: [AuthorService , BookService , ResponseHandler],
})
export class AppModule {}
