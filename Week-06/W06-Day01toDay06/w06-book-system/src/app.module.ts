import { Module } from '@nestjs/common';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './book/book.schema';

@Module({
  imports: [BookModule , 
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
    MongooseModule.forFeature([{name:Book.name , schema:BookSchema}])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
