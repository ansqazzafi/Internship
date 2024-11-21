import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';
import {Model} from 'mongoose'
@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private readonly authorModel: Model<AuthorDocument>) {}


    public async createAuthor(authorCredentials:Author): Promise<AuthorDocument> {
        try {
          const createdAuthor = new this.authorModel({...authorCredentials});
          return await createdAuthor.save();
        } catch (error) {
          throw new Error('Error creating author: ' + error.message);
        }
      }

}
