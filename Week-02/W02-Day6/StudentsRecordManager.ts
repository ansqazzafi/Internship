import * as fs from "fs/promises";
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
    const student = this.students.find(
      (st) => st.personalDetails.email === email
    );
    if (student) {
      console.log("Student found:", JSON.stringify(student, null, 2));
      return student;
    } else {
      console.log("Student not found.");
      return undefined;
    }
  }

  public async updateStudent(email: string, updatedData: Partial<Student>): Promise<void> {
    const studentIndex = this.students.findIndex(
      (st) => st.personalDetails.email === email
    );
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
    } else {
      console.log("Student not found.");
    }
  }

  public async deleteStudent(email: string): Promise<void> {
    const initialLength = this.students.length;
    this.students = this.students.filter(
      (st) => st.personalDetails.email !== email
    );
    if (this.students.length < initialLength) {
      console.log("Student deleted successfully.");
      await this.saveToFile();
    } else {
      console.log("Student not found.");
    }
  }

  private async saveToFile(): Promise<void> {
    try {
      await fs.writeFile("Students.json", JSON.stringify({students: this.students }), "utf8");
    } catch (error) {
      console.error("Error saving to file:", error);
    }
  }
}

const main = async () => {
  const fetchedStudents: Student[] = await fetchStudents();
  const studentsRecord = new StudentRecordManager(fetchedStudents);
  // studentsRecord.displayStudents();

  const existingStudent = studentsRecord.getStudent("ans@example.com");
  if (existingStudent) {
    const updatedData: Partial<Student> = { 
      personalDetails: {
        name: existingStudent.personalDetails.name,
        gender:existingStudent.personalDetails.gender,
        email:existingStudent.personalDetails.email, 
        age:24,
        address: {
          ...existingStudent.personalDetails.address, 
          city: "NEW GUJ",
        },
      },
      academicRecord: {
        ...existingStudent.academicRecord, 
        university: {
          ...existingStudent.academicRecord.university, 
          grade: "A", 
        },
      },
    };
    await studentsRecord.updateStudent("ans@example.com", updatedData);
  } else {
    console.log("Student not found to update.");
  }
  //  studentsRecord.addStudent(newStudent);  
  //  studentsRecord.deleteStudent("waqas@example.com")
  // studentsRecord.getStudent("ans@example.com")
  // studentsRecord.displayStudents()

};

main();
