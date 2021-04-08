/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Gender, NewPatientEntry } from "./src/types";

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
const parseDate =(date: unknown):string =>{
    if(!date || !isString(date) || ! isDate(date)){
         throw new Error(`Incorrect or missing date of birth ${date}`);
    }
    return date;
};
// const parseString =(text:unknown):string=>{
//     if(!text || !isString(text)){
//         throw new Error('Incorrect or missingng string');
//     }
//     return text;
// };
// const isEntryType =(param:any): param is EntryType=>{
//     return Object.values(EntryType).includes(param);
// };

// const parseEntryType =(entryType:unknown): EntryType=>{
//     if(!entryType || !isEntryType(entryType)){
//         throw new Error(`Incorrect or missing entry type ${entryType}`);
//     }
//     return entryType;
// };
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
        dateOfBirth: parseDate(req.dateOfBirth),
        ssn: parseSsn(req.ssn),
        gender: parseGender(req.gender),
        occupation:parseOccupation(req.occupation),
        entries:[]
    };
    return newPatient;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isDischarge = (param:any): param is Discharge=>{
    
//     return {
//         date: parseDate(param.date),
//         criteria: parseString(param.criteria)
//     }
// }
// const parseDischarge =(date:string,criteria:string):Discharge=>{
//     if(!isDate(date) || !isString(criteria)){
//         throw new Error(`Incorrect or missing discharge`);
//     }
//     return {date,criteria};
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const convertReqToNewEntry =(req:any):EntryWithoutId=>{
//     console.log(req);
//     let newEntry = {
//         date: parseDate(req.date),
//         description: parseString(req.description),
//         specialist: parseString(req.specialist),
//         type: parseEntryType(req.type),
//     };
//     // switch(parseEntryType(req.type)){
//     //     case EntryType.Hospital:
//     //         newEntry= {...newEntry,discharge: parseDischarge(req.discharge.date,req.discharge.criteria)};
//     //         break;
//     // }
    
//     return newEntry;
// };