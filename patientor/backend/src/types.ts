export enum Gender {
    Male = 'male',
    Female = 'female'
}
export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}



interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;

}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface Discharge{
    date: string;
    criteria: string
}

interface SickLeave {
    startDate: string;
    endDate: string
}
interface HealthCheckEntry extends BaseEntry{
    type:'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry{
    type:'OccupationalHealthcare';
    employerName:string;
    sickLeave?:SickLeave
}

interface HospitalEntry extends BaseEntry{
    type:'Hospital',
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