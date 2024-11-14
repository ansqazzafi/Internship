import mongoose, { Schema, Document } from 'mongoose';
interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  DateOfBirth: Date;
  Profession: string;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DateOfBirth: { type: Date, required: true },
    Profession: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);

export const User = mongoose.model<UserInterface>('User', userSchema);

