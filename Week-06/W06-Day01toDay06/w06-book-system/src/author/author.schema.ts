import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  authorName: string;

  @Prop({ required: true , unique:true })
  authorEmail: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  nationality: string;

}

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
