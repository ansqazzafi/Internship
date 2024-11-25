import { IsEmail, IsEnum, IsNotEmpty, IsString, IsArray , ArrayNotEmpty} from "class-validator";
import { Nationality } from "../enums/nationality.enum";

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


    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(Nationality, { each: true }) 
    nationality: Nationality[];


}