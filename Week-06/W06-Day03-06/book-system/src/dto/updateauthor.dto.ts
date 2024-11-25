import { IsArray, IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { Nationality } from '../enums/nationality.enum';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  authorName?: string;

  @IsOptional()
  @IsEmail()
  authorEmail?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Nationality, { each: true })
  nationality?:  Nationality[];

  @IsOptional()
  @IsArray()
  @IsEnum(Nationality , {each:true})
  deleteNationality?: Nationality[]
}
