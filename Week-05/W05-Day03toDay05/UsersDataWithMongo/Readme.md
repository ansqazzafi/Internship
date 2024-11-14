

# Week05 Day03 User schema with Mongoose and create models for managing user data

This project includes how to connect to a MongoDB database using Mongoose and TypeScript. It defines a `User` model and provides functionality to create and save user records to the database.

## Features
- Connect to a MongoDB database.
- Define a `User` model with fields like `firstName`, `lastName`, `email`, `DateOfBirth`, and `grade`.
- Create and save a student document in MongoDB.

The application will connect to MongoDB, create a student record, and save it to the database.

## Project Structure

```
/src
│
├── /DB
│   └── db.connection.ts    # MongoDB connection
├── /models
│   └── user.model.ts      # user model definition
└── index.ts                 # Main application file
```
