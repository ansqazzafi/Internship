import { IsString,IsNotEmpty, IsEmail, IsNumber, IsDateString, IsOptional, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}

class CourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

class GradeDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;
}

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsObject()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CourseDto)
  courses: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => GradeDto)
  grades: GradeDto[];
}
