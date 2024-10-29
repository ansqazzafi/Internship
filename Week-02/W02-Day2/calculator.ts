type Operation = 'add'|'subtract'|'multiply'|'divide'

function calculator(num1:number , num2:number , operation:Operation):number{
    if(operation === 'add'){
        return num1 + num2
    }
    else if(operation === 'subtract'){
        return num1 - num2
    }
    else if(operation === 'multiply'){
        return num1*num2
    }
    else if(operation === 'divide'){
        if(num2 === 0){
            console.log("Division by zero is not possible");
            return NaN
        }
        return num1 / num2
    }
    else{
        console.log("wrong choice");
        return NaN
    }


}

const result = calculator(12,12 ,'multiply')
console.log(result);
