//Catogarize student by grade level using enums
enum gradeLevel {
    freshman="freshman",
    sophomore="sophomore",
    junior="junior",
    senior= "senior"
}

interface StudentDetails {
    name:string,
    marks:number,
    gradeLevel:gradeLevel
}
const FilteredStudents:StudentDetails[]=[]
//generic function
function filterStudent<T extends StudentDetails>(students:T[] , passingMarks:number):T[]{
    return students.filter(student => student.marks > passingMarks)
}
const students:StudentDetails[] =[
    { name: "Ali", marks: 85, gradeLevel: gradeLevel.freshman },
    { name: "Ans", marks: 75, gradeLevel: gradeLevel.sophomore },
    { name: "yousuf", marks: 90, gradeLevel: gradeLevel.junior },
    { name: "kamram", marks: 34, gradeLevel: gradeLevel.senior }
] 

const filtered = filterStudent(students , 50)
FilteredStudents.push(...filtered)
console.log(FilteredStudents);


