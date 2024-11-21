import { Body, Controller, Get, Post, Param, Patch, Query } from '@nestjs/common';
import { Author } from './author.schema';
import { createAuthorDto } from 'src/dto/createauthor.dto';
import { AuthorService } from './author.service';
import { SuccessHandler } from 'src/interface/response.interface';
import { UpdateAuthorDto } from 'src/dto/updateauthor.dto';

@Controller('api/v1/authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }


    @Get('search')  
    public async getAuthorsByName(
        @Query('author-name') authorName: string
    ): Promise<SuccessHandler<Author[]>> {
        console.log("Entered author name", authorName);
        return await this.authorService.getAuthorsByName(authorName);
    }

    @Get()
    public async getAuthors(): Promise<SuccessHandler<Author[]>> {
        return await this.authorService.getAuthors();
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
}
