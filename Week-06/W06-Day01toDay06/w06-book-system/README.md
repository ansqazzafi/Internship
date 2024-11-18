# Week06 Day 01: MongoDB Atlas and NestJS Integration with Mongoose

## Overview

In this task on **Day 01**, I integrated **MongoDB Atlas** with a **NestJS** application using **Mongoose** to manage MongoDB collections. I created a `Book` schema that includes properties such as `title`, `author`, and `publishedDate`. This project demonstrates how to set up MongoDB Atlas, configure Mongoose with NestJS, and manage collections in MongoDB.

---

## What I Did

### Step 1: Set up MongoDB Atlas

1. **Created a MongoDB Atlas Account**:
   - I registered for a MongoDB Atlas account and created a new cluster. For testing purposes, I selected the free-tier cluster, which is sufficient for development.

2. **Created a Database User**:
   - In the MongoDB Atlas dashboard, I created a new database user with the necessary permissions (like `readWrite` access). I also set a strong password to ensure secure access to the database.

3. **Obtained the MongoDB Connection String**:
   - After setting up the cluster, I navigated to the **Clusters** tab, clicked **Connect**, and selected **Connect your application**.
   - MongoDB Atlas provided a connection string in this format:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
     ```
   - I replaced the `<username>`, `<password>`, and `<dbname>` placeholders with the actual values for my account and database.

---

### Step 2: Set up the NestJS Application

1. **Created a New NestJS Project**:
   - I used the NestJS CLI to create a new project. This application will serve as the backend that communicates with MongoDB.
   ```
   nest new projectName
   ```

2. **Installed Dependencies**:
   - I installed the necessary dependencies for MongoDB integration and environment variable management:
     - `@nestjs/config`: For loading environment variables.
     - `@nestjs/mongoose`: To integrate Mongoose with NestJS for interacting with MongoDB.
   ```
   npm install @nestjs/config @nestjs/mongoose
   ```

3. **Created a `.env` File**:
   - I created a `.env` file in the project root directory to securely store the MongoDB connection string.
   - In the `.env` file, I added the MongoDB connection string from Atlas:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
     ```
   - I ensured that I replaced the placeholders (`<username>`, `<password>`, `<dbname>`) with the actual values from my MongoDB Atlas account.

4. **Configured Mongoose in NestJS**:
   - In the `AppModule`, I imported and configured Mongoose to connect to MongoDB using the connection string stored in the `.env` file.
   - I also imported the `ConfigModule` to manage environment variables globally across the application.
   ```ts
   @Module({
     imports: [
       BookModule, 
       ConfigModule.forRoot({ isGlobal: true }),
       MongooseModule.forRootAsync({
         imports: [ConfigModule], 
         useFactory: async (configService: ConfigService) => ({
           uri: configService.get<string>('MONGO_URI'), 
         }), 
         inject: [ConfigService],
       }),
       MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
     ],
     //In the code above, when we call this NestJS automatically creates a model for the Book schema under the collection name books 
   })
   ```

---

### Step 3: Create the Book Schema

1. **Defined the Book Schema**:
   - I defined the `Book` schema using Mongoose. The schema includes the following properties:
     - `title`: A string to represent the title of the book.
     - `author`: A string for the author's name.
     - `publishedDate`: A date representing when the book was published.
   
   ```ts
   import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
   import { Document, Types } from 'mongoose';

   @Schema({ timestamps: true })
   export class Book {
     @Prop({ required: true })
     title: string;

     @Prop({ required: true })
     author: string;

     @Prop({ required: true })
     publishedDate: Date;
   }

   export type BookDocument = Book & Document;
   export const BookSchema = SchemaFactory.createForClass(Book);
   ```

2. **Created the Book Service**:
   - I created a service to handle the business logic for managing books. This service includes methods for performing CRUD operations such as creating, updating, and deleting books in the MongoDB database.

3. **Created the Book Controller**:
   - I created a controller to define the API endpoints. Initially, I set up a simple `GET` endpoint to fetch all books from the database. This allowed me to verify that the connection to MongoDB was working and that I could successfully retrieve data from the `Book` collection.

4. **Created the Book Module**:
   - I encapsulated the `Book` schema, service, and controller into a `BookModule`. This modular structure ensures that the application is organized and scalable as additional features or entities are added in the future.

---


