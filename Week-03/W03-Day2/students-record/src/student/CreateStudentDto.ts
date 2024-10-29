import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

// Address DTO
class AddressDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  location: string;
}

// School DTO
class SchoolDto {
  @IsString()
  schoolName: string;

  @IsString()
  grade: string;

  @IsString()
  passingYear: string;
}

// Intermediate DTO
class IntermediateDto {
  @IsString()
  collegeName: string;

  @IsString()
  grade: string;

  @IsString()
  passingYear: string;
}

// University DTO
class UniversityDto {
  @IsString()
  university: string;

  @IsString()
  grade: string;

  @IsString()
  passingYear: string;
}

// Academic Record DTO
 export class AcademicRecordDto {
  @IsOptional()
  school?: SchoolDto;

  @IsOptional()
  intermediate?: IntermediateDto;

  @IsOptional()
  university?: UniversityDto;
}

// Personal Details DTO
 export class PersonalDetailsDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsArray()
  @IsOptional()
  contacts: number[];

  address: AddressDto;
}

export class CreateStudentDto {
  personalDetails: PersonalDetailsDto;
  academicRecord?: AcademicRecordDto; 
}
