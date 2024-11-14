

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


