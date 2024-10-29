// JavaScript functions to TypeScript with type annotations for variables, parameters, and return types. 
// return number
var addNumbers = function (num1, num2) {
    return num1 + num2;
};
// return string
var returnName = function (Name) {
    return Name;
};
// return boolean true or false
var isActive = function (status) {
    return status;
};
// return array of names
var returnNamesArray = function (names) {
    return names;
};
//return array of numbers
var returnNumbersArray = function (numbersArray) {
    return numbersArray;
};
//return Object
var studentData = function (name, age) {
    return {
        name: name,
        age: age
    };
};
var numbersArray = returnNumbersArray([1, 1, 23, 3]);
var namesArray = returnNamesArray(["Ali", "Aliyaar", "tayyab"]);
var Name = returnName('Ali');
var result = addNumbers(12, 23);
var student = studentData("Ali", 11);
var Status = isActive(true);
console.log(numbersArray);
console.log(namesArray);
console.log(Name);
console.log(student);
console.log(result);
console.log(Status);
