function calculator(num1, num2, operation) {
    if (operation === 'add') {
        return num1 + num2;
    }
    else if (operation === 'subtract') {
        return num1 - num2;
    }
    else if (operation === 'multiply') {
        return num1 * num2;
    }
    else if (operation === 'divide') {
        if (num2 === 0) {
            console.log("Division by zero is not possible");
            return NaN;
        }
        return num1 / num2;
    }
    else {
        console.log("wrong choice");
        return NaN;
    }
}
var result = calculator(12, 12, 'multiply');
console.log(result);
