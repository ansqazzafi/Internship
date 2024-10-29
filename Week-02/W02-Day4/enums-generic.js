//Catogarize student by grade level using enums
var gradeLevel;
(function (gradeLevel) {
    gradeLevel["freshman"] = "freshman";
    gradeLevel["sophomore"] = "sophomore";
    gradeLevel["junior"] = "junior";
    gradeLevel["senior"] = "senior";
})(gradeLevel || (gradeLevel = {}));
var FilteredStudents = [];
//generic function
function filterStudent(students, passingMarks) {
    return students.filter(function (student) { return student.marks > passingMarks; });
}
var students = [
    { name: "Ali", marks: 85, gradeLevel: gradeLevel.freshman },
    { name: "Ans", marks: 75, gradeLevel: gradeLevel.sophomore },
    { name: "yousuf", marks: 90, gradeLevel: gradeLevel.junior },
    { name: "kamram", marks: 34, gradeLevel: gradeLevel.senior }
];
var filtered = filterStudent(students, 50);
FilteredStudents.push.apply(FilteredStudents, filtered);
console.log(FilteredStudents);
