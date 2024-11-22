import { Body, Controller, Get, Post, Param, Patch, Delete,  Query, Search } from '@nestjs/common';
import { Author } from './author.schema';
import { createAuthorDto } from 'src/dto/createauthor.dto';
import { AuthorService } from './author.service';
import { SuccessHandler } from 'src/interface/response.interface';
import { UpdateAuthorDto } from 'src/dto/updateauthor.dto';
import { Nationality } from 'src/enums/nationality.enum';

@Controller('api/v1/authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }


    @Get()  
    public async getAuthorsByName(
        @Query('search') search: string,
        @Query('nationality') nationality?:Nationality
    ): Promise<SuccessHandler<Author[]>> {
        if(search){
            console.log("Entered search name", search);
            return await this.authorService.getAuthorsByName(search , nationality);
        }
        else{
            return await this.authorService.getAuthors()
        }
    }
    @Get(':authorId')
    public async getAuthor(@Param('authorId') authorId: string): Promise<SuccessHandler<Author>> {
        return await this.authorService.getAuthor(authorId);
    }

    @Post()
    public async createAuthor(@Body() createAuthorDto: createAuthorDto): Promise<SuccessHandler<Author[]>> {
        console.log("Entered : ", createAuthorDto);
        return await this.authorService.createAuthor(createAuthorDto);
    }

    @Patch(':authorId')
    public async updateAuthor(@Param('authorId') authorId: string,
        @Body() updateAuthorDto: UpdateAuthorDto
    ): Promise<SuccessHandler<Author>> {
        console.log("emterrrr");
        return await this.authorService.updateAuthor(authorId, updateAuthorDto);
    }


    @Delete(':authorId')
    public async deleteAuthor(@Param('authorId') authorId:string):Promise<SuccessHandler<Author>>{
        return await this.authorService.deleteAuthorAndBooks(authorId)
    }
}
