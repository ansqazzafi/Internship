import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from 'src/book/book.schema';
import { Nationality } from 'src/enums/nationality.enum';
@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true , unique:true })
  authorEmail: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ type: [String], enum: Object.values(Nationality), required: true })
  nationality: Nationality[];

  @Prop({ type: Types.ObjectId, ref: 'Book'})
  Books: Book[];

}

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
