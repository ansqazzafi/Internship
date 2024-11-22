
# Book System Project

This Project contains the implementation of the tasks for **Week 06** (Day 3 to Day 6) except jest working on it. The project focuses on building a comprehensive book management system using **MongoDB** as the database. Below is a detailed overview of the tasks implemented during the week.

---

## Features and Tasks

### 1. CRUD Operations
- **Books**:
  - Implemented `Create`, `Read`, `Update`, and `Delete` functionalities for books.
  - Used MongoDB methods like `find`, `update`, `delete`, and `save`.
- **Authors**:
  - Implemented `Create`, `Read`, `Update`, and `Delete` functionalities for authors.
  - Similar to books, MongoDB methods were used for efficient database interactions.

### 2. Indexing
- Created the following indexes to improve query performance:
  - **Text Index**: Applied on the `BookTitle` and `authorId` field of the book schema to support text search functionality.

### 3. Aggregation Pipelines
- Used **MongoDB Aggregation Pipelines** for data analysis and handling complex queries.
- Examples include:
  - Filtering books based on specific conditions.
  - Calculating statistics like total book count, genre-wise distribution, etc.
  - Pagination and result formatting.

### 4. Text Search
- Implemented a search functionality to find books based on text in the `title` and `description` fields.
- Utilized the MongoDB `$text` operator for efficient full-text search.

### 5. Transactions
- Applied **MongoDB Transactions** using sessions to ensure data consistency during deletion:
  - When an author is deleted, all books associated with that author are also deleted.
  - This ensures data integrity and avoids orphaned records.

### 6. Complex Queries with Aggregations
- Used **MongoDB Aggregate Functions** to handle advanced queries:
  - Grouped Books based on genre and get their total count of each genre 

---

## Project Structure
- **Controllers**: Handles incoming requests and delegates them to services.
- **Services**: Contains the business logic for interacting with the database.
- **Schemas**: Defines the structure for MongoDB collections (e.g., Book and Author).
- **Indexing**: Ensures efficient querying by applying appropriate indexes.
- **Transactions**: Implements MongoDB sessions to handle multi-document transactions.

---
