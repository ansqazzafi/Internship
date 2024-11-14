import { User } from "./src/models/user.model";
import connectDB from "./src/DB/db.connection";
import mongoose from "mongoose";
const createUser = async () => {
    try {
      const newUser = new User({
        firstName: 'Ans',
        lastName: 'Chaudhary',
        email: 'anschaudhary12@gmail.com',
        DateOfBirth: new Date('2001-01-01'), 
        Profession: 'Software Engineer',
      });
      const savedUser = await newUser.save();
      console.log('User created:', savedUser);
    } catch (err) {
      console.error('Error creating user', err);
    }
  };
  
  const run = async () => {
    await connectDB(); 
    await createUser(); 
    mongoose.disconnect(); 
  };
  
  run().catch((err) => {
    console.error('Error during execution:', err);
    mongoose.disconnect(); 
  });
  