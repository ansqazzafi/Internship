import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './auth/user.model';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { Book } from './books/books.model';
import { BookSchema } from './books/books.model';
import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
      }),
    // MongooseModule.forRoot('mongodb://localhost:27017/Users'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], 
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), 
      }),
      
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{name:User.name , schema:UserSchema}]),
    MongooseModule.forFeature([{name:Book.name , schema:BookSchema}])
    ,AuthModule, BooksModule],
  controllers: [AuthController , BooksController  , AppController],
  providers: [AuthService , BooksService , JwtService],
})
export class AppModule {}