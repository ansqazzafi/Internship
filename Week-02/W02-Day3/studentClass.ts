import { StudentRecord } from "./interface";


class StudentsRecord {
    private studentsRecord: StudentRecord[] = []
    constructor() {
        console.log("Object has been created");
    }

    public addStudent(studentData: StudentRecord): StudentRecord {
        this.studentsRecord.push(studentData)
        return studentData
    }

    public getAllStudentsRecord(): StudentRecord[] {
        return this.studentsRecord
    }
}

const newStudentRecord = new StudentsRecord()
const data:StudentRecord={
    name:"Ans",
    age:34,
    scores:[34,45,23]
}
const result = newStudentRecord.addStudent(data)
const response = newStudentRecord.getAllStudentsRecord()
console.log("Student add successfully" , result);
console.log("All students",response);





