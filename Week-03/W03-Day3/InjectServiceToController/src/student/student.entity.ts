// src/students/student.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface Address {
  country: string;
  city: string;
  location: string;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  contacts: number[];
  address: Address;
}

interface AcademicRecord {
  school: {
    schoolName: string;
    grade: string;
    passingYear: string;
  };
  intermediate: {
    collegeName: string;
    grade: string;
    passingYear: string;
  };
  university: {
    university: string;
    grade: string;
    passingYear: string;
  };
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  personalDetails: PersonalDetails;

  @Column('json', { nullable: true })
  academicRecord: AcademicRecord;
}
