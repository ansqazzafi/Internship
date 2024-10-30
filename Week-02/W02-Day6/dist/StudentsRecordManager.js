import * as fs from "fs/promises";
import * as readline from "readline/promises";
import fetchStudents from "./fetchStudents.js";
class StudentRecordManager {
    students = [];
    constructor(students) {
        this.students = [...students];
        console.log("Students added");
    }
    displayStudents() {
        console.log("Student Records:", JSON.stringify(this.students, null, 2));
    }
    async addStudent(student) {
        this.students.push(student);
        await this.saveToFile();
        console.log("Student added successfully:", student);
    }
    getStudent(email) {
        const student = this.students.find((st) => st.personalDetails.email === email);
        if (student) {
            console.log("Student found:", JSON.stringify(student, null, 2));
            return student;
        }
        else {
            console.log("Student not found.");
            return undefined;
        }
    }
    async updateStudent(email, updatedData) {
        const studentIndex = this.students.findIndex((st) => st.personalDetails.email === email);
        if (studentIndex !== -1) {
            const currentStudent = this.students[studentIndex];
            this.students[studentIndex] = {
                ...currentStudent,
                ...updatedData,
                personalDetails: {
                    ...currentStudent.personalDetails,
                    ...(updatedData.personalDetails || {}),
                },
                academicRecord: {
                    ...currentStudent.academicRecord,
                    ...(updatedData.academicRecord || {}),
                },
            };
            console.log("Student updated successfully:", this.students[studentIndex]);
            await this.saveToFile();
        }
        else {
            console.log("Student not found.");
        }
    }
    async deleteStudent(email) {
        const initialLength = this.students.length;
        this.students = this.students.filter((st) => st.personalDetails.email !== email);
        if (this.students.length < initialLength) {
            console.log("Student deleted successfully.");
            await this.saveToFile();
        }
        else {
            console.log("Student not found.");
        }
    }
    async saveToFile() {
        try {
            await fs.writeFile("Students.json", JSON.stringify({ students: this.students }), "utf8");
        }
        catch (error) {
            console.error("Error saving to file:", error);
        }
    }
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const main = async () => {
    const fetchedStudents = await fetchStudents();
    const studentsRecord = new StudentRecordManager(fetchedStudents);
    const askUser = async () => {
        console.log("\nChoose an action:");
        console.log("1. Display all students");
        console.log("2. Add a new student");
        console.log("3. Update an existing student");
        console.log("4. Delete a student");
        console.log("5. Get a student by email");
        console.log("6. Exit");
        const action = await rl.question("Enter your choice (1-6): ");
        switch (action) {
            case '1':
                studentsRecord.displayStudents();
                break;
            case '2':
                const newStudent = await getStudentDetails();
                await studentsRecord.addStudent(newStudent);
                break;
            case '3':
                const updateEmail = await rl.question("Enter the email of the student to update: ");
                const updatedData = await getStudentDetails();
                await studentsRecord.updateStudent(updateEmail, updatedData);
                break;
            case '4':
                const deleteEmail = await rl.question("Enter the email of the student to delete: ");
                await studentsRecord.deleteStudent(deleteEmail);
                break;
            case '5':
                const getEmail = await rl.question("Enter the email of the student to retrieve: ");
                studentsRecord.getStudent(getEmail);
                break;
            case '6':
                console.log("Exiting...");
                await rl.close();
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
        await askUser();
    };
    const getStudentDetails = async () => {
        const name = await rl.question("Enter name: ");
        const email = await rl.question("Enter email: ");
        const age = await rl.question("Enter age: ");
        const gender = await rl.question("Enter gender: ");
        const country = await rl.question("Enter country: ");
        const city = await rl.question("Enter city: ");
        const location = await rl.question("Enter location: ");
        const schoolName = await rl.question("Enter school name: ");
        const schoolYearOfCompletion = await rl.question("Enter school year of completion: ");
        const schoolGrade = await rl.question("Enter school grade: ");
        const intermediateName = await rl.question("Enter intermediate name: ");
        const intermediateYearOfCompletion = await rl.question("Enter intermediate year of completion: ");
        const intermediateGrade = await rl.question("Enter intermediate grade: ");
        const universityName = await rl.question("Enter university name: ");
        const universityYearOfCompletion = await rl.question("Enter university year of completion: ");
        const universityDegree = await rl.question("Enter university degree: ");
        const universityGrade = await rl.question("Enter university grade: ");
        return {
            personalDetails: {
                name,
                email,
                age: Number(age),
                gender,
                address: {
                    country,
                    city,
                    location,
                },
            },
            academicRecord: {
                school: {
                    name: schoolName,
                    yearOfCompletion: Number(schoolYearOfCompletion),
                    grade: schoolGrade,
                },
                intermediate: {
                    name: intermediateName,
                    yearOfCompletion: Number(intermediateYearOfCompletion),
                    grade: intermediateGrade,
                },
                university: {
                    name: universityName,
                    yearOfCompletion: Number(universityYearOfCompletion),
                    degree: universityDegree,
                    grade: universityGrade,
                },
            },
        };
    };
    await askUser();
};
main();
