"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentsRecord = /** @class */ (function () {
    function StudentsRecord() {
        this.studentsRecord = [];
        console.log("Object has been created");
    }
    StudentsRecord.prototype.addStudent = function (studentData) {
        this.studentsRecord.push(studentData);
        return studentData;
    };
    StudentsRecord.prototype.getAllStudentsRecord = function () {
        return this.studentsRecord;
    };
    return StudentsRecord;
}());
var newStudentRecord = new StudentsRecord();
var data = {
    name: "Ans",
    age: 34,
    scores: [34, 45, 23]
};
var result = newStudentRecord.addStudent(data);
var response = newStudentRecord.getAllStudentsRecord();
console.log("Student add successfully", result);
console.log("All students", response);
