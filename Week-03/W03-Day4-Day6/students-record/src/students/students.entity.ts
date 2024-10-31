import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface Address {
    country: string;
    city: string;
    location: string;
}

interface Course {
    name: string;
    description: string;
}

interface Grade {
    subject: string;
    score: number;
}

@Schema({ timestamps: true })
export class Student {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({
        type: {
            country: { type: String, required: true },
            city: { type: String, required: true },
            location: { type: String, required: true },
        },
        required: true,
    })
    address: Address; 

    @Prop({ required: false })
    phoneNumber: string;

    @Prop({
        type: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
        }],
        required: true,
    })
    courses: Course[];

    @Prop({
        type: [{
            subject: { type: String, required: true },
            score: { type: Number, required: true },
        }],
        required: true,
    })
    grades: Grade[]; 
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
