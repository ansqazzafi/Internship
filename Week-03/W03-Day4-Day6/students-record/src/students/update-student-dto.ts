import { IsString, IsEmail, IsNumber, IsDateString, IsOptional, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  location: string;
}

class CourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

class GradeDto {
  @IsString()
  subject: string;

  @IsNumber()
  score: number;
}

export class UpdateStudentDTO {
  @IsString()
  @IsOptional() 
  firstName?: string;

  @IsString()
  @IsOptional() 
  lastName?: string;

  @IsEmail()
  @IsOptional() 
  email?: string;

  @IsDateString()
  @IsOptional() 
  dateOfBirth?: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional() 
  address?: AddressDto;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  @IsOptional() 
  courses?: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  @IsOptional() 
  grades?: GradeDto[];
}
