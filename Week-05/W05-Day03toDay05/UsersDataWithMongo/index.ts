import { User } from "./src/models/user.model";
import connectDB from "./src/DB/db.connection";
import mongoose from "mongoose";
const createUser = async () => {
    try {
        const newUser = new User({
            firstName: 'mark',
            lastName: 'luke',
            email: 'mark@gmail.com',
            DateOfBirth: new Date('2001-01-23'),
            profession: 'Business Developer',
            country: 'USA'
        });
        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
    } catch (err) {
        console.error('Error creating user', err);
    }
};

const filterUserQuerries = async () => {
    // filter user based on profession
    const filteredUserByProfession = await User.aggregate([{
        $match: {
            profession: 'Software Engineer'
        }
    }])
    const filteredUserByCountry = await User.aggregate([{
        $match: {
            country: 'USA'
        }
    }])
    const filteredUserByEmail = await User.aggregate([{
        $match: {
            email: 'mark@gmail.com'
        }
    }])

    const filteredUserByProfessionAndCountry = await User.aggregate([{
        $match: {
            profession: 'AI Engineer', country: 'Pakistan'
        }
    }])
    // console.log(filteredUserByProfession);
    // console.log(filteredUserByCountry);
    // console.log(filteredUserByEmail);
    // console.log(filteredUserByProfessionAndCountry);

}


const updateAgeForAllUsers = async () => {
           await User.updateMany(
            {},
            [
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
            ]
        );

    };


const sortUserbyDOB = async () => {
        const sortedUser = await User.aggregate([{
            $sort: { age: 1 }
        }])
        console.log(sortedUser);

    }


 const countNumberofUserInProfession = async () => {
        const UsersInProfession = await User.aggregate([{
            $group: { _id: "$profession", count: { $sum: 1 } }
        }])

        console.log(UsersInProfession);

    }


const groupUserByProfessionAndCountry = async()=>{
        const result = await User.aggregate([
            { $group: { _id: { country: "$country", profession: "$profession" }, count: { $sum: 1 } } }
          ])

          console.log(result);
          

    }

    const run = async () => {
        await connectDB();
        // await filterUserQuerries()
        // await updateAgeForAllUsers()
        // await sortUserbyDOB()
        // await countNumberofUserInProfession()
        // await groupUserByProfessionAndCountry()
        mongoose.disconnect();
    };

    run().catch((err) => {
        console.error('Error during execution:', err);
        mongoose.disconnect();
    });
