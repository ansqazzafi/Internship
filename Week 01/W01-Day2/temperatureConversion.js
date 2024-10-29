const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter 'C' for Celsius to Fahrenheit and 'F' for Fahrenheit to Celsius: ", (choice) => {
    if (choice.toUpperCase() === 'C') {
        rl.question("Enter the temperature in Celsius: ", (celsiusInput) => {
            const celsius = parseFloat(celsiusInput);
            const result =  (9 / 5) * celsius + 32;
            console.log(`${celsius}°C is ${result.toFixed(2)}°F`);
            rl.close();
        });
    } else if (choice.toUpperCase() === 'F') {
        rl.question("Enter the temperature in Fahrenheit: ", (fahrenheitInput) => {
            const fahrenheit = parseFloat(fahrenheitInput);
            const result = (5 / 9) * (fahrenheit - 32);;
            console.log(`${fahrenheit}°F is ${result.toFixed(2)}°C`);
            rl.close();
        });
    } else {
        console.log("Entered Invalid choice");
        rl.close();
    }
});
