interface PersonalDetails {
    name: string;
    age: number;
    gender: string;
    email: string;
    address: {
        country: string;
        city: string;
        location: string;
    };
}

interface AcademicRecord {
    school: {
        name: string;
        yearOfCompletion: number;
        grade: string;
    };
    intermediate: {
        name: string;
        yearOfCompletion: number;
        grade: string;
    };
    university: {
        name: string;
        yearOfCompletion: number;
        degree: string;
        grade: string;
    };
}

export interface Student {
    personalDetails: PersonalDetails;
    academicRecord: AcademicRecord;
}
