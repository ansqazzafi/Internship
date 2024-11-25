import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from '../author/author.schema';
import { Genre } from '../enums/genre.enum';

@Schema({ timestamps: true })
export class Book {
  

  // <-------------- in previous it was used with index 'true' ---------------> 
  // @Prop({ required: true, index: true })
  // BookTitle: string;


  
  @Prop({ required: true })
  BookTitle: string;

  @Prop({ required: true })
  BookDescription: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true, index: true })
  authorId: Author;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true })
  Edition: string;

  @Prop({ type: String, enum: Object.values(Genre) }) 
  genre: Genre;

  @Prop()
  pageCount: Number;

  @Prop()
  language: string;
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.index({ BookTitle: 'text', BookDescription: 'text' });
