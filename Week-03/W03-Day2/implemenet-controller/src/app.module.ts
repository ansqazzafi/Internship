import { Module } from '@nestjs/common';

import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StudentModule],
  controllers: [StudentController],
  providers: [],
})
export class AppModule {}
