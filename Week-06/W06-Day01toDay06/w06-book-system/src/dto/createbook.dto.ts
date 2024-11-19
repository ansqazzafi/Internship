import { IsNotEmpty, IsString, IsDate, IsMongoId } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  publishedDate: Date;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsString()
  authorEmail: string;

  @IsNotEmpty()
  @IsMongoId()
  bio: string; 

  @IsNotEmpty()
  @IsDate()
  nationality: string;
}
