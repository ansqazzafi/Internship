import { StudentsService } from './students.service';
import { Student } from './students.entity';
import { Controller, Post, Body, Get ,Put, Param, Delete} from '@nestjs/common';
@Controller('students')
export class StudentsController {
    constructor(private readonly studentService :StudentsService){}
    @Post('createStudent')
    public async createStudent(@Body() studentData: Student): Promise<Student> {
        return await this.studentService.createStudent(studentData);
    }


    @Get('getAllStudents')
    public async getAllStudents():Promise<Student[]>{
        return await this.studentService.getAllStudents()
    }


    @Post('getOneStudent/:id')
    public async getOneStudent(@Param('id')id:string):Promise<Student>{
        return await this.studentService.getOneStudent(id)
    }

    @Delete('deleteStudent/:id')
    public async deleteStudent(@Param('id') id:string):Promise<Student>{
        return await this.studentService.deleteStudent(id)
    }

    @Put('updateStudent/:id')
    public async updateStudent(
        @Param('id') id: string,
        @Body() studentData: Partial<Student>
    ): Promise<Student> {
        return await this.studentService.updateStudent(id, studentData);
    }
}
