const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})
rl.question("Enter your name :" , (name)=>{
    rl.question("Enter your age : " , (age)=>{
        console.log(`Hey, ${name} Good morning! your age is ${age}`);
        rl.close()
    })
})