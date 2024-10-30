import * as fs from "fs/promises";
import * as readline from "readline/promises";
import fetchStudents from "./fetchStudents";
import { Student } from "./StudentInterface";

class StudentRecordManager {
    private students: Student[] = [];

    constructor(students: Student[]) {
        this.students = [...students];
        console.log("Students added");
    }

    public displayStudents(): void {
        console.log("Student Records:", JSON.stringify(this.students, null, 2));
    }

    public async addStudent(student: Student): Promise<void> {
        this.students.push(student);
        await this.saveToFile();
        console.log("Student added successfully:", student);
    }

    public getStudent(email: string): Student | undefined {
        const student = this.students.find(st => st.personalDetails.email === email);
        if (student) {
            console.log("Student found:", JSON.stringify(student, null, 2));
            return student;
        } else {
            console.log("Student not found.");
            return undefined;
        }
    }

    public async updateStudent(email: string, updatedData: Student): Promise<void> {
        const studentIndex = this.students.findIndex(std => std.personalDetails.email === email);
        if (studentIndex < 0) {
            console.log("Student not found.");
            return;
        }
        this.students[studentIndex] = updatedData;
        await this.saveToFile();
        console.log("Student updated successfully.");
    }

    public async deleteStudent(email: string): Promise<void> {
        const initialLength = this.students.length;
        this.students = this.students.filter(st => st.personalDetails.email !== email);
        if (this.students.length < initialLength) {
            console.log("Student deleted successfully.");
            await this.saveToFile();
        } else {
            console.log("Student not found.");
        }
    }

    private async saveToFile(): Promise<void> {
        try {
            await fs.writeFile("Students.json", JSON.stringify({ students: this.students }), "utf8");
        } catch (error) {
            console.error("Error saving to file:", error);
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = async () => {
    const fetchedStudents: Student[] = await fetchStudents();
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
                const updatedData = await getDetailsForUpdation(updateEmail, studentsRecord);
                if (updatedData) {
                    await studentsRecord.updateStudent(updateEmail, updatedData);
                }
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

    const getDetailsForUpdation = async (email: string, recordManager: StudentRecordManager): Promise<Student | null> => {
        const studentToUpdate = recordManager.getStudent(email);
        if (!studentToUpdate) {
            console.log("Student not found.");
            return null;
        }

        const name = await rl.question(`Current Name is: ${studentToUpdate.personalDetails.name}. Enter new name: `);
        const newName = name.trim() || studentToUpdate.personalDetails.name;

        const emailInput = await rl.question(`Current Email is: ${studentToUpdate.personalDetails.email}. Enter new email: `);
        const newEmail = emailInput.trim() || studentToUpdate.personalDetails.email;

        const ageInput = await rl.question(`Current Age is: ${studentToUpdate.personalDetails.age}. Enter new age: `);
        const newAge = ageInput.trim() ? parseInt(ageInput.trim(), 10) : studentToUpdate.personalDetails.age;

        const genderInput = await rl.question(`Current Gender is: ${studentToUpdate.personalDetails.gender}. Enter new gender: `);
        const newGender = genderInput.trim() || studentToUpdate.personalDetails.gender;

        const countryInput = await rl.question(`Current Country is: ${studentToUpdate.personalDetails.address.country}. Enter new country: `);
        const newCountry = countryInput.trim() || studentToUpdate.personalDetails.address.country;

        const cityInput = await rl.question(`Current City is: ${studentToUpdate.personalDetails.address.city}. Enter new city: `);
        const newCity = cityInput.trim() || studentToUpdate.personalDetails.address.city;

        const locationInput = await rl.question(`Current Location is: ${studentToUpdate.personalDetails.address.location}. Enter new location: `);
        const newLocation = locationInput.trim() || studentToUpdate.personalDetails.address.location;

        // Update academic record
        const schoolNameInput = await rl.question(`Current School Name is: ${studentToUpdate.academicRecord.school.name}. Enter new school name: `);
        const newSchoolName = schoolNameInput.trim() || studentToUpdate.academicRecord.school.name;

        const schoolYearInput = await rl.question(`Current School Year of Completion is: ${studentToUpdate.academicRecord.school.yearOfCompletion}. Enter new year of completion: `);
        const newSchoolYear = schoolYearInput.trim() ? parseInt(schoolYearInput.trim(), 10) : studentToUpdate.academicRecord.school.yearOfCompletion;

        const schoolGradeInput = await rl.question(`Current School Grade is: ${studentToUpdate.academicRecord.school.grade}. Enter new grade: `);
        const newSchoolGrade = schoolGradeInput.trim() || studentToUpdate.academicRecord.school.grade;

        const intermediateNameInput = await rl.question(`Current Intermediate Name is: ${studentToUpdate.academicRecord.intermediate.name}. Enter new intermediate name: `);
        const newIntermediateName = intermediateNameInput.trim() || studentToUpdate.academicRecord.intermediate.name;

        const intermediateYearInput = await rl.question(`Current Intermediate Year of Completion is: ${studentToUpdate.academicRecord.intermediate.yearOfCompletion}. Enter new year of completion: `);
        const newIntermediateYear = intermediateYearInput.trim() ? parseInt(intermediateYearInput.trim(), 10) : studentToUpdate.academicRecord.intermediate.yearOfCompletion;

        const intermediateGradeInput = await rl.question(`Current Intermediate Grade is: ${studentToUpdate.academicRecord.intermediate.grade}. Enter new grade: `);
        const newIntermediateGrade = intermediateGradeInput.trim() || studentToUpdate.academicRecord.intermediate.grade;

        const universityNameInput = await rl.question(`Current University Name is: ${studentToUpdate.academicRecord.university.name}. Enter new university name: `);
        const newUniversityName = universityNameInput.trim() || studentToUpdate.academicRecord.university.name;

        const universityYearInput = await rl.question(`Current University Year of Completion is: ${studentToUpdate.academicRecord.university.yearOfCompletion}. Enter new year of completion: `);
        const newUniversityYear = universityYearInput.trim() ? parseInt(universityYearInput.trim(), 10) : studentToUpdate.academicRecord.university.yearOfCompletion;

        const universityDegreeInput = await rl.question(`Current University Degree is: ${studentToUpdate.academicRecord.university.degree}. Enter new degree: `);
        const newUniversityDegree = universityDegreeInput.trim() || studentToUpdate.academicRecord.university.degree;

        const universityGradeInput = await rl.question(`Current University Grade is: ${studentToUpdate.academicRecord.university.grade}. Enter new grade: `);
        const newUniversityGrade = universityGradeInput.trim() || studentToUpdate.academicRecord.university.grade;

        const newUpdatedData: Student = {
            personalDetails: {
                name: newName,
                email: newEmail,
                age: newAge,
                gender: newGender,
                address: {
                    country: newCountry,
                    city: newCity,
                    location: newLocation
                }
            },
            academicRecord: {
                school: {
                    name: newSchoolName,
                    yearOfCompletion: newSchoolYear,
                    grade: newSchoolGrade
                },
                intermediate: {
                    name: newIntermediateName,
                    yearOfCompletion: newIntermediateYear,
                    grade: newIntermediateGrade
                },
                university: {
                    name: newUniversityName,
                    yearOfCompletion: newUniversityYear,
                    degree: newUniversityDegree,
                    grade: newUniversityGrade
                }
            }
        };
        return newUpdatedData;
    };

    const getStudentDetails = async (): Promise<Student> => {
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
        } 
    };

    await askUser();
};

main()
