import readline from "readline";
import fs from "fs/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let students = [];

const fetchStudentData = async () => {
  try {
    const data = await fs.readFile("Students.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading student data or file not found, initializing empty student list.");
    return { students: [] };
  }
};

const calculateAverage = (scores) => {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return (total / scores.length).toFixed(2);
};

const createStudentCounter = () => {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
    initialize: (initialCount) => { count = initialCount; }
  };
};

const studentCounter = createStudentCounter();

const displaySummary = async () => {
  console.log("Total number of students:", studentCounter.getCount());

  let highestTotalScore = -Infinity; 
  let lowestTotalScore = Infinity;   

  students.forEach((std) => {
    const avg = calculateAverage(std.scores);
    const totalScore = std.scores.reduce((sum, score) => sum + score, 0); 
    console.log(`Student Name: ${std.name}, Average Score: ${avg}, Total Score: ${totalScore}`);
    if (totalScore > highestTotalScore) {
      highestTotalScore = totalScore;
    }
    if (totalScore < lowestTotalScore) {
      lowestTotalScore = totalScore;
    }
  });
  console.log(`Highest Total Score: ${highestTotalScore}`);
  console.log(`Lowest Total Score: ${lowestTotalScore}`);
};

const addStudent = async () => {
  const response = await fetchStudentData();
  students = response.students;
  studentCounter.initialize(students.length);
  rl.question("Do you want to add a student? 'Y' for Yes, 'N' for No: ", (choice) => {
    if (choice.toUpperCase() === "Y") {
      rl.question("Enter name of the student: ", (name) => {
        rl.question("Enter Scores of 5 Subjects (PF,OOP,AI,ML,DS) in a format (e.g : 12,12,12,12,12) : ", async (scores) => {
          const newscores = scores.split(",").map((score) => Number(score.trim()));
          const invalidScore = newscores.some((score) => isNaN(score));
          if (invalidScore) {
            console.log("Invalid format of score, please enter a valid format.");
            return addStudent();
          }
          else if(newscores.length !== 5){
            console.log("number of subject score should be 5! You can't add student with given scores");
            return addStudent();

          } else {
            students.push({ name, scores: newscores });
            await fs.writeFile("Students.json", JSON.stringify({ students }), "utf8");
            console.log(`Student ${name} added successfully!`);
            studentCounter.increment();
            addStudent(); 
          }
        });
      });
    } else {
      displaySummary()
      rl.close()
    }
  });
};

addStudent();
