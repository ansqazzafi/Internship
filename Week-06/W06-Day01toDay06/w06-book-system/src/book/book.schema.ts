import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from 'src/author/author.schema';
@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  authorId: Author;

  @Prop({ required: true })
  publishedDate: Date;

}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);
