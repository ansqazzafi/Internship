"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./src/models/user.model");
const db_connection_1 = __importDefault(require("./src/DB/db.connection"));
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_model_1.User({
            firstName: 'mark',
            lastName: 'luke',
            email: 'mark@gmail.com',
            DateOfBirth: new Date('2001-01-23'),
            profession: 'Business Developer',
            country: 'USA'
        });
        const savedUser = yield newUser.save();
        console.log('User created:', savedUser);
    }
    catch (err) {
        console.error('Error creating user', err);
    }
});
const filterUserQuerries = () => __awaiter(void 0, void 0, void 0, function* () {
    // filter user based on profession
    const filteredUserByProfession = yield user_model_1.User.aggregate([{
            $match: {
                profession: 'Software Engineer'
            }
        }]);
    const filteredUserByCountry = yield user_model_1.User.aggregate([{
            $match: {
                country: 'USA'
            }
        }]);
    const filteredUserByEmail = yield user_model_1.User.aggregate([{
            $match: {
                email: 'mark@gmail.com'
            }
        }]);
    const filteredUserByProfessionAndCountry = yield user_model_1.User.aggregate([{
            $match: {
                profession: 'AI Engineer', country: 'Pakistan'
            }
        }]);
    // console.log(filteredUserByProfession);
    // console.log(filteredUserByCountry);
    // console.log(filteredUserByEmail);
    // console.log(filteredUserByProfessionAndCountry);
});
const updateAgeForAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.updateMany({}, [
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
});
const sortUserbyDOB = () => __awaiter(void 0, void 0, void 0, function* () {
    const sortedUser = yield user_model_1.User.aggregate([{
            $sort: { age: 1 }
        }]);
    console.log(sortedUser);
});
const countNumberofUserInProfession = () => __awaiter(void 0, void 0, void 0, function* () {
    const UsersInProfession = yield user_model_1.User.aggregate([{
            $group: { _id: "$profession", count: { $sum: 1 } }
        }]);
    console.log(UsersInProfession);
});
const groupUserByProfessionAndCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        { $group: { _id: { country: "$country", profession: "$profession" }, count: { $sum: 1 } } }
    ]);
    console.log(result);
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.default)();
    // await filterUserQuerries()
    // await updateAgeForAllUsers()
    // await sortUserbyDOB()
    // await countNumberofUserInProfession()
    yield groupUserByProfessionAndCountry();
    mongoose_1.default.disconnect();
});
run().catch((err) => {
    console.error('Error during execution:', err);
    mongoose_1.default.disconnect();
});
