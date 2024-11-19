import { IsNotEmpty, IsString, IsDate, IsMongoId, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsDate()
  publishedDate: Date;

}
