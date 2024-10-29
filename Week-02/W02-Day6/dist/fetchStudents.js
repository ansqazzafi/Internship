import * as fs from 'fs/promises';
export const fetchStudents = async () => {
    try {
        const response = await fs.readFile('students.json', 'utf-8');
        const data = JSON.parse(response);
        return data.students;
    }
    catch (error) {
        console.error("Error fetching students:", error);
        return [];
    }
};
export default fetchStudents;
