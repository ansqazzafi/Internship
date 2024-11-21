import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';
import { Model } from 'mongoose';
import { createAuthorDto } from 'src/dto/createauthor.dto';
import { ResponseHandler } from 'src/utility/success.response';
import { SuccessHandler } from 'src/interface/response.interface';
import { UpdateAuthorDto } from 'src/dto/updateauthor.dto';
@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private readonly authorModel: Model<AuthorDocument>,
    private readonly responseHandler: ResponseHandler) { }

  public async createAuthor(createAuthorDto: createAuthorDto): Promise<SuccessHandler<Author[]>> {
    console.log(createAuthorDto, "service");
    try {
      const createdAuthor = new this.authorModel({
        ...createAuthorDto
      });
      await createdAuthor.save();
      return this.responseHandler.successHandler(createdAuthor, "Author created Sucessfully")
    } catch (error) {
      console.error('Error creating author:', error);
      throw new Error('Error creating author: ' + error.message);
    }
  }


  public async getAuthors(): Promise<SuccessHandler<Author[]>> {
    try {
      const authors = await this.authorModel.find()
      if (authors.length === 0) {
        throw new ConflictException("No Author exist")
      }
      return this.responseHandler.successHandler(authors, "Authors fetched successfully")
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      console.error('Error creating author:', error);
      throw new Error('Error fetching author: ' + error.message);
    }
  }
  public async getAuthor(authorId: string): Promise<SuccessHandler<Author>> {
    try {
      const author = await this.authorModel.findById(authorId)
      if (!author) {
        throw new NotFoundException("No Author exist with Given ID")
      }
      return this.responseHandler.successHandler(author, "Author fetched Sucessfully with given id")
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      console.error('Error creating author:', error);
      throw new Error('Error fetching author: ' + error.message);
    }
  }

  public async updateAuthor(authorId: string, updateAuthorDto: UpdateAuthorDto): Promise<SuccessHandler<Author>> {
    console.log(authorId, updateAuthorDto, "gfsdsg");

    try {

      const updateFields: any = {};
      if (updateAuthorDto.authorName) {
        updateFields.authorName = updateAuthorDto.authorName;
      }
      if (updateAuthorDto.authorEmail) {
        console.log("Om", updateAuthorDto.authorEmail);

        updateFields.authorEmail = updateAuthorDto.authorEmail;
      }
      if (updateAuthorDto.bio) {
        updateFields.bio = updateAuthorDto.bio;
      }

      if (updateAuthorDto.nationality) {
        updateFields.$addToSet = {
          nationality: { $each: updateAuthorDto.nationality }
        };
      }

      if (updateAuthorDto.deleteNationality) {
        updateFields.$pull = {
          nationality: { $in: updateAuthorDto.deleteNationality }
        };
      }


      console.log(updateFields, "Fieldss");

      const updatedAuthor = await this.authorModel.findByIdAndUpdate(
        authorId,
        updateFields,
        { new: true, runValidators: true }
      );

      console.log(updatedAuthor, "UpdatedAuthor");

      if (!updatedAuthor) {
        throw new NotFoundException("Author not found");
      }

      return this.responseHandler.successHandler(updatedAuthor, "Author updated successfully");
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error("Something went wrong during the update");
    }
  }

  public async getAuthorsByName(authorName: string): Promise<SuccessHandler<Author[]>> {

    try {
      console.log("service ," , authorName);
      const authors = await this.authorModel.find({
        authorName: { $regex: authorName, $options: 'i' } 
      }).exec();

      console.log(authors  , "dfasaaa");
      

      if (authors.length === 0) {
        throw new NotFoundException(`No authors found with the name "${authorName}"`);
      }

      return this.responseHandler.successHandler(authors, "Authors fetched successfully");
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new Error("There was an error during fetching authors: " + error.message);
    }
  }

}
