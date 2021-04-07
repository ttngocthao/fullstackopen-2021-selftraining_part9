export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}



interface BaseEntry{
  id: string;    
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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
export interface HealthCheckEntry extends BaseEntry{
    type:'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type:'OccupationalHealthcare';
    employerName:string;
    sickLeave?:SickLeave
}

export interface HospitalEntry extends BaseEntry{
    type:'Hospital',
    discharge: Discharge
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}