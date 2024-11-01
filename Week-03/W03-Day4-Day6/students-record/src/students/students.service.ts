import { Injectable, NotFoundException } from '@nestjs/common';
import { Student, StudentDocument } from './students.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDTO } from './create-student-dto';
import { UpdateStudentDTO } from './update-student-dto';
@Injectable()
export class StudentsService {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    public async createStudent(createStudentDTO:CreateStudentDTO): Promise<Student> {
        console.log(createStudentDTO);
        const newStudent = await this.studentModel.create(createStudentDTO)
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


    public async updateStudent(studentId: string, updateStudentDTO: UpdateStudentDTO): Promise<Student> {
        const foundStudent = await this.studentModel.findById(studentId);
        if (!foundStudent) {
            throw new NotFoundException("Student not found");
        }

        Object.assign(foundStudent, updateStudentDTO);
        return await foundStudent.save();
    }
    
}
