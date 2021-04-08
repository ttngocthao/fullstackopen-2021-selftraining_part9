export enum Gender {
    Male = 'male',
    Female = 'female'
}

export enum EntryType {
    Hospital ='Hospital',
    OccupationalHealthcare='OccupationalHealthcare',
    HealthCheck ='HealthCheck'
}


export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}



interface BaseEntry {
    id: string;    
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
    type:EntryType;

}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge{
    date: string;
    criteria: string
}

interface SickLeave {
    startDate: string;
    endDate: string
}
export interface HealthCheckEntry extends BaseEntry{
    type:EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type:EntryType.OccupationalHealthcare;
    employerName:string;
    sickLeave?:SickLeave
}

export interface HospitalEntry extends BaseEntry{
    type:EntryType.Hospital,
    discharge: Discharge
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type PublicPatientEntry = Omit <PatientEntry,'ssn'|'entries'>;

export type NewPatientEntry = Omit<PatientEntry,'id'>;
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry,'id'>;