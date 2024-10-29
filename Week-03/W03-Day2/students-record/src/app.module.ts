import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module'; // Adjust the import path

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'students.db', // Ensure this path is correct
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Dynamically load entities
      synchronize: true, // Note: set to false in production
    }),
    StudentModule, 
  ],
})
export class AppModule {}
