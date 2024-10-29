// JavaScript functions to TypeScript with type annotations for variables, parameters, and return types. 


// return number
const addNumbers = (num1:number , num2:number):number=>{
    return num1 + num2
}


// return string
const returnName = (Name:string):string=>{
    return Name
}

// return boolean true or false
const isActive=(status:boolean):boolean=>{
    return status
}

// return array of names
const returnNamesArray = (names:string[]):string[]=>{
    return names
}

//return array of numbers
const returnNumbersArray = (numbersArray:number[]):number[]=>{
    return  numbersArray
}


// Interface for returning object
interface Student{
    name:string,
    age:number
}

//return Object
const studentData = (name:string , age:number):Student=>{
    return{
        name,
        age
    }

}

const numbersArray:number[] = returnNumbersArray([1,1,23,3]) 
const namesArray:string[] = returnNamesArray(["Ali" , "Aliyaar" , "tayyab"])
const Name:string = returnName('Ali')
const result:number =  addNumbers(12,23)
const student = studentData("Ali" , 11)
const Status = isActive(true)
console.log(numbersArray);
console.log(namesArray);
console.log(Name);
console.log(student);
console.log(result);
console.log(Status);
