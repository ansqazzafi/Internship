
# Create a service to handle business logic for student records.
# Inject the service into the controller using NestJS's dependency injection system 
# By Ans Qazzafi


# NestJS Student Records API
## Overview
Create a service to handle business logic for student records.
• Inject the service into the controller using NestJS's dependency injection system.

## Features
- **Save Personal Details**: Add a student's personal information.
- **Save Academic Records**: Update a student's academic details.
- **Retrieve Students**: Get all students or a specific student by ID.

## Setup Instructions
1. Install NestJS CLI: `npm install -g @nestjs/cli`
2. Create a new project: `nest new InjectServiceToController`
3. Implement the `Student` entity, service, and controller.
4. Run the application: `npm run start:dev`

## API Endpoints
- **POST /api/students/personal-details**: Save personal details.
- **POST /api/students/:id/academic-records**: Save academic records.
- **GET /api/students**: Get all students.
- **GET /api/students/:id**: Get a student by ID.

---