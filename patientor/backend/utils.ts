import { Gender, NewPatientEntry } from "./src/types";

const isString =(str:unknown): str is string =>{
    return typeof str === 'string' || str instanceof String;
};

const parseName =(name:unknown): string=>{
    if(!name || !isString(name)){
        throw new Error ('Incorrect or missing name!');
    }
    return name;
};

const parseSsn = (ssn:unknown):string =>{
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn!');
    }
    return ssn;
};

const parseOccupation =(occupation:unknown):string=>{
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation!');
    }
    return occupation;
};

const isDate =(date:string):boolean =>{
    return Boolean(Date.parse(date));
};
const parseDOB =(date: unknown):string =>{
    if(!date || !isString(date) || ! isDate(date)){
         throw new Error(`Incorrect or missing date of birth ${date}`);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender =(param:any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const parseGender =(gender:unknown): Gender=>{
    if(!gender || !isGender(gender)){
        throw new Error(`Incorrect or missing gender ${gender}`);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertReqToNewPatientEntry =(req:any):NewPatientEntry=>{
    const newPatient ={
        name: parseName(req.name),
        dateOfBirth: parseDOB(req.dateOfBirth),
        ssn: parseSsn(req.ssn),
        gender: parseGender(req.gender),
        occupation:parseOccupation(req.occupation)
    };
    return newPatient;
};