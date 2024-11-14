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
            firstName: 'Ans',
            lastName: 'Chaudhary',
            email: 'anschaudhary12@gmail.com',
            DateOfBirth: new Date('2001-01-01'),
            Profession: 'Software Engineer',
        });
        const savedUser = yield newUser.save();
        console.log('User created:', savedUser);
    }
    catch (err) {
        console.error('Error creating user', err);
    }
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_connection_1.default)();
    yield createUser();
    mongoose_1.default.disconnect();
});
run().catch((err) => {
    console.error('Error during execution:', err);
    mongoose_1.default.disconnect();
});
