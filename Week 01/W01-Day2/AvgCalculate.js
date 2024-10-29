const readline = require("readline");
let studentScores = [];
let totalScore = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function isScoreValid(score) {
    return !isNaN(score) && score.trim() !== '';
}
function askForStudentDetails() {
    rl.question("Enter the name of the student: ", (name) => {
        rl.question("Enter the score of the student: ", (score) => {
            if (!isScoreValid(score)) {
                console.log("Invalid score. Please enter a numeric value.");
                askForStudentDetails()
            } else {
                studentScores.push({ name, score: parseFloat(score) });
                totalScore += parseFloat(score);
                console.log("Student added:", { name, score });
                rl.question("Do you want to enter another student? (yes/no): ", (answer) => {
                    if (answer.toLowerCase() === "yes") {
                        askForStudentDetails();
                    } else {
                        const averageScore = totalScore / studentScores.length;
                        console.log("Total Score: ", totalScore);
                        console.log("Average Score: ", averageScore);
                        console.log("All Students: ", studentScores);
                        rl.close();
                    }
                });
            }
        });
    });
}
askForStudentDetails();
