import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsMongoId, IsArray, IsEnum, IsNumber, IsObject } from 'class-validator';
import { Genre } from '../enums/genre.enum';

export class CreateBookDto {
  
  @IsNotEmpty()
  @IsString()
  BookTitle: string;

  @IsNotEmpty()
  @IsString()
  BookDescription: string;

  @IsNotEmpty()
  @IsMongoId()
  authorId: string;

  @IsNotEmpty()
  @IsDate()
  @Type(()=>Date)
  publishedDate: Date;

  @IsNotEmpty()
  @IsString()
  Edition: string;

  @IsNotEmpty()
  @IsEnum(Genre)
  genre: Genre;

  @IsNotEmpty()
  @IsNumber()
  pageCount: number;

  @IsNotEmpty()
  @IsString()
  language: string;

}
