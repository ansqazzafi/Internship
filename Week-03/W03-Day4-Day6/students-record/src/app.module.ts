import { Module } from '@nestjs/common';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Student } from './students/students.entity';
import { StudentSchema } from './students/students.entity';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/StudentsRecords'),
    MongooseModule.forFeature([{name:Student.name , schema:StudentSchema}])
    ,StudentsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class AppModule {}
