# Create a users Collection and perform CRUD operations (Create, Read, Update, Delete) using mongo shell or MongoDB compass.
# I have used Mongo Shell.
## Prerequisites
- MongoDB must be installed on your machine.
- Access to MongoDB shell (`mongo` command) or MongoDB Atlas if you're using a cloud-based MongoDB instance.

## Setup
### 1. Connect to MongoDB
Start the MongoDB shell by typing the following commands in your terminal:

```bash
mongo
```

If you're working with a specific database, switch to it using the `use` command:

```bash
use UsersRecord
```

Where `UsersRecord` is the name of the database you wish to work with. If the database does not exist, MongoDB will create it when you first insert data.

### 2. Create a `Users` Collection
MongoDB automatically creates a collection when you insert a document. Below are examples for inserting documents into the `Users` collection.

## CRUD Operations
    
### 1. **Create** - Inserting Documents
#### Insert a Single User
```javascript
db.Users.insertOne({
    name: "Ans",
    age: 22,
    email: "ans@example.com",
    isActive: true
});
```

#### Insert Multiple Users
```javascript
db.Users.insertMany([
    {
        name: "Ali",
        age: 30,
        email: "ali@example.com",
        isActive: true
    },
    {
        name: "yousuf",
        age: 35,
        email: "yousuf@example.com",
        isActive: false
    }
]);
```

---

---

### 2. **Read** - Querying Documents

- **Find All Users**:
```javascript
db.Users.find();
```

- **Find a Specific User by Name**:

```javascript
db.Users.find({ name: "Ans" });
```

- **Find a User by Email (returns a single document)**:

```javascript
db.Users.findOne({ email: "ans@example.com" });
```

- **Find Active Users**:

```javascript
db.Users.find({ isActive: true });
```
---

### 3. **Update** - Modifying Documents

- **Update a Single Document (Change Alice’s Age)**:

```javascript
db.Users.updateOne(
    { name: "Ans" },      
    { $set: { age: 23 } }      
);
```

- **Update Multiple Documents (Deactivate users older than 30)**:

```javascript
db.Users.updateMany(
    { age: { $gt: 25 } },   
    { $set: { isActive: false } }
);
```

- **Increment a Field (Increase Age for All Users by 1)**:

```javascript
db.Users.updateMany(
    {},                          
    { $inc: { age: 1 } }         
);
```

---

### 4. **Delete** - Removing Documents

- **Delete a Single Document (Remove Bob)**:

```javascript
db.Users.deleteOne({ name: "Ali" });
```

- **Delete Multiple Documents (Remove Inactive Users)**:

```javascript
db.Users.deleteMany({ isActive: false });
```

- **Delete All Documents (Be Cautious with this Operation)**:

```javascript
db.Users.deleteMany({});
```

---




