

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
Here's a simplified and concise README file with the provided code examples included:

---
## Week05 Day04 Aggregation Queries
# Users Collection Queries

This project provides MongoDB queries to filter, sort, and aggregate data in the "users" collection.


## Filter Queries

### Filter Users by Profession, Country, or Email

```js
const filterUserQueries = async () => {
    // Filter by profession
    const filteredByProfession = await User.aggregate([{ $match: { profession: 'Software Engineer' } }]);

    // Filter by country
    const filteredByCountry = await User.aggregate([{ $match: { country: 'USA' } }]);

    // Filter by email
    const filteredByEmail = await User.aggregate([{ $match: { email: 'mark@gmail.com' } }]);

    // Filter by profession and country
    const filteredByProfessionAndCountry = await User.aggregate([{
        $match: { profession: 'AI Engineer', country: 'Pakistan' }
    }]);
};
```

---

## Update Queries

### Update Age for All Users

This query calculates the age of each user based on their DateOfBirth and updates it in the `age` field.

```js
const updateAgeForAllUsers = async () => {
    await User.updateMany({}, [
        {
            $set: {
                age: {
                    $subtract: [
                        new Date().getFullYear(),
                        { $year: '$DateOfBirth' }
                    ]
                }
            }
        }
    ]);
};
```

---

## Sort Queries

### Sort Users by Age (Ascending)

Sort the users by age in ascending order.

```js
const sortUserByDOB = async () => {
    const sortedUser = await User.aggregate([{ $sort: { age: 1 } }]);
    console.log(sortedUser);
};
```

---




Count the number of users in each profession.

```js
const countUsersByProfession = async () => {
    const usersInProfession = await User.aggregate([{
        $group: { _id: "$profession", count: { $sum: 1 } }
    }]);
    console.log(usersInProfession);
};
```

### Group Users by Profession and Country

Group users by both profession and country, and count the number of users in each group.

```js
const groupUsersByProfessionAndCountry = async () => {
    const result = await User.aggregate([{
        $group: { _id: { country: "$country", profession: "$profession" }, count: { $sum: 1 } }
    }]);
    console.log(result);
};
```

---


# Week05 Day05 Apply indexing on field and Measure performance before and after Indexing
## Description
This project includes basic MongoDB operations using Mongoose in a TypeScript environment, such as creating users, querying, and filtering data. It also includes an example of a query that runs without indexing and after indexing and the associated execution time.

## Optimized Query Without Indexing
The following function filters users with an `age` greater than 30. This query is executed **without any indexes** on the `age` field:

```ts
const NotoptimizedQuerryByIndexes = async () => {
    const filterUserByAge = await User.find({ age: { $gt: 30 } }).explain('executionStats');
    console.log(filterUserByAge);
};
```

### Execution Time Without Indexing
- **Execution Time**: When running this query without an index on the `age` field, MongoDB performs a **collection scan** (scans all documents in the collection), which can be slower, especially for large collections.
- **Output**: The `.explain('executionStats')` method provides details on how MongoDB executed the query, including execution time and the number of documents scanned.

```json
{
  executionStats: {
    executionSuccess: true,
    nReturned: 15,
    executionTimeMillis: 1,
    totalKeysExamined: 0,
    totalDocsExamined: 41,
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: [Object],
      nReturned: 15,
      executionTimeMillisEstimate: 0,
      works: 42,
      advanced: 15,
      needTime: 26,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 41
    },
}
```

it is examine 41 documents and return 15 this approach are not recommended for large data


## Optimized Query With Indexing
The following approaches define index in schema, filters users with an `age` greater than 30. This query is executed **with indexes** on the `age` field:


```ts
const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DateOfBirth: { type: Date, required: true },
    profession: { type: String, required: true },
    age: { type: Number, required: false },
    country: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);
userSchema.index({age:1}) //defined index
```

```ts
const optimizedQuerryByIndexes = async () => {
    const filterUserByAge = await User.find({ age: { $gt: 30 } }).explain('executionStats');
    console.log(filterUserByAge);
};


 const run = async () => {
        await connectDB();
        await User.createIndexes(); // indexes will be created
        await optimizedQuerryByIndexes()
        mongoose.disconnect();
    };
```
### Execution Time Wth Indexing
- **Execution Time**: When running this query with an index on the `age` field, MongoDB performs a **index scan** , which can be faster, especially for large collections.
- **Output**: The `.explain('executionStats')` method provides details on how MongoDB executed the query, including execution time and the number of documents scanned.

```json
executionStats: {
    executionSuccess: true,
    nReturned: 15,
    executionTimeMillis: 0,
    totalKeysExamined: 15,
    totalDocsExamined: 15,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 15,
      executionTimeMillisEstimate: 0,
      works: 16,
      advanced: 15,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 15,
      alreadyHasObj: 0,
      inputStage: [Object]
    },
    allPlansExecution: []
  },
  command: { find: 'users', filter: { age: [Object] }, '$db': 'User' },
  serverInfo: {
    host: 'Brackets-10244',
    port: 27017,
    version: '8.0.1',
    gitVersion: 'fcbe67d668fff5a370e2d87b9b1f74bc11bb7b94'
  },
```

it is examined 15 documents and return 15 from BTree this approach are recommended for large data.
