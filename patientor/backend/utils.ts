/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Gender,  NewEntry, NewHealthCheckEntry, NewPatientEntry, NewBaseEntry,  DiagnosisCodes, NewHospitalEntry, Discharge, NewOccupationalHealthCareEntry , SickLeave} from "./src/types";

const isNumber =(value: unknown):value is number=>{
    return typeof value ==='number';
};

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
//============================================================================//


interface BaseEntryBody {
    date: unknown;
    specialist:unknown;
    description: unknown;
    diagnosisCodes?:unknown;
}


//! as entrybase have date, string and diagnosisCodes,
//! need to parseDateField, parseStringField, parseDiagnosisCodes
const parseEntryBase =({date,specialist,description,diagnosisCodes}:BaseEntryBody):NewBaseEntry=>{
    return {
        date: parseDateField(date,'entry date'),
        specialist: parseStringField(specialist,'specialist'),
        description: parseStringField(description,'description'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };
};


//? get unknown value, field name(just to return the error message more clearly)
//? return a string
const parseDateField =(value:unknown,field:string):string=>{
    if(!value || !isString(value) || !isDate(value)){
        throw new Error(`Incorrect or missing ${field}`);
    }
    return value;
};

const parseStringField = (value:unknown,field:string):string =>{
    if(!value || !isString(value)){
        throw new Error(`Incorrect or missing ${field}`);
    }
    return value;
};

const parseNumberField =(value:unknown,field:string):number=>{
    if(value===undefined || !isNumber(value) ){
        throw new Error(`Incorrect or missing ${field}`);
    }
    return value;
};
const isArray =(value:unknown): boolean=>{
    return Array.isArray(value);
};
const parseDiagnosisCodes =(value:unknown):DiagnosisCodes | undefined=>{
    if(!value){
        return undefined;
    }
    if(!isArray(value)){
        throw new Error(`Incorrect diagnosisCodes`);
    }
    return value as DiagnosisCodes;
};

interface HealthCheckBody extends BaseEntryBody{
    healthCheckRating: unknown;
}


const toHealthCheckEntry =({date,specialist,description,diagnosisCodes,healthCheckRating}:HealthCheckBody):NewHealthCheckEntry=>{
    //? as HealthCheckBody has healthCheckRating field, which is number
    //? need to parse it to number field

    return {
        ...parseEntryBase({date,specialist,description,diagnosisCodes}),
        type:'HealthCheck',
        healthCheckRating:parseNumberField(healthCheckRating,'healthCheckRating')
    };
};
interface HospitalBody extends BaseEntryBody{
    discharge: unknown
}
//* Use any type when the value is an object
//* Use unknown type when the value is specific
//! if there is multiple return values, specific set the type of return value is a must
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge =(value: any): Discharge | undefined=>{
    if(!value){
        return undefined;
    }
    if(!value.date || !value.criteria || !isDate(value.date) || isString(value.criteria)){
        throw new Error('Incorrect discharge data');
    }
    return value as Discharge;
};
const toHospitalEntry =({date,specialist,description,diagnosisCodes,discharge}:HospitalBody):NewHospitalEntry=>{
    //? as hospital body has discharge field, which is object
    //? need to parse it to Discharge interface
    return{
        ...parseEntryBase({date,specialist,description,diagnosisCodes}),
        type:'Hospital',
        discharge: parseDischarge(discharge)
    };
};

interface OccupationalHealthCareBody extends BaseEntryBody {
    employerName: unknown,
    sickLeaves: unknown
}

const parseSickLeaves =(value:any): SickLeave |undefined=>{
    if(!value){
        return undefined;
    }
    if(!value.startDate || !isDate(value.startDate) || !value.endDate || !isDate(value.endDate)){
        throw new Error('Incorrect sickLeave data');
    }
    return value as SickLeave;
};

const toOccupationalHealthcare =({date,specialist,description,diagnosisCodes,employerName,sickLeaves}:OccupationalHealthCareBody):NewOccupationalHealthCareEntry=>{
    return{
        ...parseEntryBase({date,specialist,description,diagnosisCodes}),
        type:'OccupationalHealthcare',
        employerName: parseStringField(employerName,'employerName'),
        sickLeave: parseSickLeaves(sickLeaves)

    };
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertReqToNewEntry =(req:any):NewEntry=>{
    const type = req.type as string;
    if(type==='HealthCheck'){
        return toHealthCheckEntry(req);
    }
    if(type==='Hospital'){
        return toHospitalEntry(req);
    }
    if(type==='OccupationalHealthcare'){
        return toOccupationalHealthcare(req);
    }
    throw new Error('wrong entry type');
};