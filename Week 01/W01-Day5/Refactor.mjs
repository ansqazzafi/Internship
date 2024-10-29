import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;
rl.question('Do you want to convert from (C)elsius or (F)ahrenheit? ', (choice) => {
    if (choice.toUpperCase() === 'C') {
        rl.question('Enter temperature in Celsius: ', (temp) => {
            const celsius = parseFloat(temp);
            const fahrenheit = celsiusToFahrenheit(celsius);
            console.log(`From ${celsius}°C to ${fahrenheit.toFixed(2)}°F`);
            rl.close();
        });
    } else if (choice.toUpperCase() === 'F') {
        rl.question('Enter temperature in Fahrenheit: ', (temp) => {
            const fahrenheit = parseFloat(temp);
            const celsius = fahrenheitToCelsius(fahrenheit);
            console.log(`From ${fahrenheit}°F to ${celsius.toFixed(2)}°C`);
            rl.close();
        });
    } else {
        console.log('Invalid input. Please enter "C" or "F".');
        rl.close();
    }
});
