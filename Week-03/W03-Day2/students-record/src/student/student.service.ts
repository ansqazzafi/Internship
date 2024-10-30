import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { AcademicRecordDto, CreateStudentDto, PersonalDetailsDto } from './CreateStudentDto';
@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
      ) {} 


      public async savePersonalDetails(personalDetailsDto: PersonalDetailsDto): Promise<Student> {
        const student = this.studentRepository.create({
          personalDetails: personalDetailsDto,
        });
        return this.studentRepository.save(student);
      }

      public async saveAcademicDetails(studentId: number ,academicRecordDto:AcademicRecordDto):Promise<Student>{
        const student = await this.studentRepository.findOne({
            where:{id:studentId}
        })
        if(!student){
            throw new NotFoundException("Previous data are not saved")
        }

        student.academicRecord = {
            school: academicRecordDto.school,
            intermediate:academicRecordDto.intermediate,
            university:academicRecordDto.university
        }

        return this.studentRepository.save(student)
      }

      public async getAllStudents():Promise<Student[]>{
        return await this.studentRepository.find()
      }

      public async getOneStudent(studentId:number):Promise<Student>{
        return await this.studentRepository.findOne({
          where:{id:studentId}
        })
      }



}
