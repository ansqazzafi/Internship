import { IsEmail, IsEnum, IsNotEmpty, IsString, IsArray } from "class-validator";
import { Nationality } from "src/enums/nationality.enum";

export class createAuthorDto {

    @IsNotEmpty()
    @IsString()
    authorName: string;


    @IsNotEmpty()
    @IsEmail()
    authorEmail: string;


    @IsNotEmpty()
    @IsString()
    bio: string;


    @IsNotEmpty()
    @IsArray()
    @IsEnum(Nationality, { each: true }) 
    nationality: Nationality[];


}