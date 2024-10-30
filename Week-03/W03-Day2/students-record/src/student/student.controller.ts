import { Controller, Post, Body, Get , Param} from '@nestjs/common';
import { StudentService } from './student.service';
import { AcademicRecordDto, PersonalDetailsDto } from './CreateStudentDto'; // Adjust the import path
import { Student } from './student.entity';
import { identity } from 'rxjs';

@Controller('api/students') 
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    @Get()
    async getAllStudents():Promise<Student[]>{
        return await this.studentService.getAllStudents()
    }

    @Get(':id')
    async getOneStudent(@Param('id')id:number):Promise<Student>{
        return await this.studentService.getOneStudent(id)
    }
    @Post('personal-details')
    async savePersonalDetails(@Body() personalDetailsDto: PersonalDetailsDto): Promise<Student> {
        return await this.studentService.savePersonalDetails(personalDetailsDto);
    }

    @Post(':id/academic-records') 
    async saveAcademicDetails(
        @Param('id') id: number, 
        @Body() academicRecordDto: AcademicRecordDto
    ): Promise<Student> {
        return await this.studentService.saveAcademicDetails(id, academicRecordDto); 
    }

    
}
