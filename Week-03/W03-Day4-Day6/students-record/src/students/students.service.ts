import { Injectable, NotFoundException } from '@nestjs/common';
import { Student, StudentDocument } from './students.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    public async createStudent(studentData: Student): Promise<Student> {
        const newStudent = await this.studentModel.create(studentData)
        return await newStudent.save()
    }


    public async getAllStudents(): Promise<Student[]> {
        const allStudents = await this.studentModel.find()
        return allStudents
    }

    public async getOneStudent(studentId: string): Promise<Student> {
        const FoundStudent = await this.studentModel.findById(studentId)
        if (!FoundStudent) throw new NotFoundException("Student not Found")
        return FoundStudent
    }

    public async deleteStudent(studentId: string): Promise<Student> {
        const checkStudent = await this.studentModel.findById(studentId);
        if (!checkStudent) {
            throw new NotFoundException("Student not found");
        }
        await this.studentModel.deleteOne({ _id: studentId });
        return checkStudent;
    }


    public async updateStudent(studentId: string, studentData: Partial<Student>): Promise<Student> {
        const foundStudent = await this.studentModel.findById(studentId);
        if (!foundStudent) {
            throw new NotFoundException("Student not found");
        }

        Object.assign(foundStudent, studentData);
        return await foundStudent.save();
    }
    
}
