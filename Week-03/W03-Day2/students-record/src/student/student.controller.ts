import { Controller, Post, Body, Get , Param} from '@nestjs/common';
import { StudentService } from './student.service';
import { AcademicRecordDto, PersonalDetailsDto } from './CreateStudentDto'; // Adjust the import path
import { Student } from './student.entity';

@Controller('students') 
export class StudentController {
    constructor(private readonly studentService: StudentService) {}


    @Get()
    greet():string{
        return "hello"

    }
    @Post('personal')
    async savePersonalDetails(@Body() personalDetailsDto: PersonalDetailsDto): Promise<Student> {
        return this.studentService.savePersonalDetails(personalDetailsDto);
    }

    @Post(':id/academic') 
    async saveAcademicDetails(
        @Param('id') id: number, 
        @Body() academicRecordDto: AcademicRecordDto
    ): Promise<Student> {
        return this.studentService.saveAcademicDetails(id, academicRecordDto); 
    }
}
