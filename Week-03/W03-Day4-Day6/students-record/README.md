# Week 03 Day 04 Implement routes for adding, updating, and deleting students.

This is a NestJS application that provides a RESTful API for managing student records. The API allows you to create, retrieve, update, and delete student information, including personal details, courses, and grades.

## Features

- Create a new student record
- Retrieve all student records
- Retrieve a single student record by ID
- Update an existing student record
- Delete a student record

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

# Week 03 Day 05 NestJS DTOs and Validation Pipe

Here’s a focused section for the README that covers the Data Transfer Objects (DTOs) and validation specifically for creating and updating student records which are the tasks of Week 03 Day 05.

````markdown
## Data Transfer Objects (DTOs) and Validation

This API uses Data Transfer Objects (DTOs) to define the structure and validation rules for the data when creating and updating student records. The `class-validator` library is employed to ensure that incoming data meets the specified requirements.

### CreateStudentDto

The `CreateStudentDto` is used for creating a new student record. The following fields are required:

- `firstName`: The first name of the student (string).
- `lastName`: The last name of the student (string).
- `email`: The email address of the student (string, must be a valid email format).
- `dateOfBirth`: The student's date of birth (string, must be in ISO 8601 format).
- `address`: An object containing:
  - `country`: The country of residence (string).
  - `city`: The city of residence (string).
  - `location`: The specific address (string).
- `phoneNumber`: An optional field for the student's phone number (string).
- `courses`: An array of course objects, each containing:
  - `name`: The name of the course (string).
  - `description`: A description of the course (string).
- `grades`: An array of grade objects, each containing:
  - `subject`: The subject for which the grade is given (string).
  - `score`: The numeric score received (number).

### UpdateStudentDto

The `UpdateStudentDTO` is used for updating an existing student record. All fields are optional, allowing for partial updates. The fields are:

- `firstName`: The first name of the student (string).
- `lastName`: The last name of the student (string).
- `email`: The email address of the student (string, must be a valid email format).
- `dateOfBirth`: The student's date of birth (string, must be in ISO 8601 format).
- `address`: An object containing:
  - `country`: The country of residence (string).
  - `city`: The city of residence (string).
  - `location`: The specific address (string).
- `phoneNumber`: An optional field for the student's phone number (string).
- `courses`: An optional array of course objects.
- `grades`: An optional array of grade objects.

### Validation

Validation is enforced using the `class-validator` library. When a request is made to create or update a student record, the API checks the incoming data against the defined DTOs. If any required fields are missing or if the data types are incorrect, a `400 Bad Request` response will be returned, detailing the validation errors.

Example error response for invalid data:

```json
{
  "message": [
    "email must be an email",
    "dateOfBirth must be a valid ISO 8601 date string",
    "address must be an object",
    "courses must be an array",
    "grades must be an array"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```
````

# Week 03 Day 06 NestJS Custom Exceptions Filters for error handling

## Custom Exception Filter

### Purpose

The `CustomExceptionFilter` is responsible for catching exceptions thrown during the execution of your API methods. It formats error responses in a standard way, providing clients with clear information about any issues that occur.

### Implementation

1. **Create the Exception Filter**

   Create a file named `custom-exception.filter.ts` in your project directory.

   ```typescript
   import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
   import { Response } from 'express';

   @Catch()  // This filter will catch all exceptions
   export class CustomExceptionFilter implements ExceptionFilter {
     catch(exception: unknown, host: ArgumentsHost) {
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       const status = exception instanceof HttpException
         ? exception.getStatus()
         : HttpStatus.INTERNAL_SERVER_ERROR;

       const message = exception instanceof HttpException
         ? exception.getResponse()
         : 'Internal server error';

       response.status(status).json({
         statusCode: status,
         message,
       });
     }
   }


2. **Applying the Filter**

   You can apply the `CustomExceptionFilter` globally or at the controller level.

   - **Globally**: In your `main.ts` file, register the filter:

     ```typescript
     import { NestFactory } from '@nestjs/core';
     import { AppModule } from './app.module';
     import { CustomExceptionFilter } from './custom-exception.filter';

     async function bootstrap() {
       const app = await NestFactory.create(AppModule);
       app.useGlobalPipes(
         new ValidationPipe({
           whitelist: true,
           forbidNonWhitelisted: true,
           transform: true,
         }),
       );
       app.useGlobalFilters(new CustomExceptionFilter());
       await app.listen(3000);
     }
     bootstrap();
     ```

   - **At the Controller Level**: You can also apply it to specific controllers:

     ```typescript
     import { Controller, UseFilters } from '@nestjs/common';
     import { CustomExceptionFilter } from './custom-exception.filter';

     @Controller('students')
     @UseFilters(CustomExceptionFilter)
     export class StudentsController {
       // Controller methods...
     }
     ```

### Example Response

When an error occurs, the filter will catch it and return a structured JSON response. For instance, if an invalid request is made, the response might look like:

```json
{
  "statusCode": 400,
  "message": "Validation failed: email must be an email"
}
```

### Benefits

- **Consistency**: All error responses follow a uniform structure.
- **Clarity**: Clients receive clear messages indicating what went wrong.
- **Ease of Maintenance**: Centralized error handling makes it easier to manage and update error responses.


