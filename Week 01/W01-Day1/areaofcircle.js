const readline = require("readline")
let area = 0;
let pie = Math.PI
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})
rl.question("Enter the radius the of circle :" , (radius)=>{
    area = pie * radius * radius
    console.log(radius , "radius");
    console.log(pie , "pie");
    console.log("Area of the Circle are : " , area);
    rl.close()
})