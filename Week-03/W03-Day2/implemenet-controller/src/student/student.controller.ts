import { Controller, Get, Post, Body, Param } from '@nestjs/common';

interface Student {
     name: string;
     email: string;
     age: number;
     gender: string;
     country: string;
     city: string;
     location: string;
}

@Controller('student')
export class StudentController {
    private students: Student[] = [];
    @Post()
    create(@Body() student: Student) {
        this.students.push(student);
        return student;
    }
    @Get()
    findAll() {
        return this.students;
    }
    @Get(':email')
    findOne(@Param('email') email: string) {
        return this.students.find(student => student.email === email);
    }
}
