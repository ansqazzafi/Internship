import { Type } from 'class-transformer';
import { IsOptional, IsString, IsDate, IsMongoId, IsEnum, IsNumber } from 'class-validator';
import { Genre } from 'src/enums/genre.enum';

export class UpdateBookDto {

  @IsOptional()
  @IsString()
  BookTitle?: string;

  @IsOptional()
  @IsString()
  BookDescription?: string;

  @IsOptional()
  @IsMongoId()
  authorId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedDate?: Date;

  @IsOptional()
  @IsString()
  Edition?: string;

  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @IsOptional()
  @IsNumber()
  pageCount?: number;

  @IsOptional()
  @IsString()
  language?: string;
}
