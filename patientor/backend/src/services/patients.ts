import {v1 as uuid} from 'uuid';
import {NewPatientEntry, PatientEntry, PublicPatientEntry,Entry} from '../types';
import patients from '../../data/patients';

const getAll = ():PublicPatientEntry[]=>{
    return patients.map(({id,name,dateOfBirth,gender,occupation})=>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const add = (entry: NewPatientEntry): PatientEntry=>{
    const newPatient = {
        id: uuid(),
        ...entry
    };
    patients.push(newPatient);
    return newPatient;
};

const getById =(id:string):PublicPatientEntry =>{
    
    const patient =  patients.find(item=>item.id === id);
   
    if(!patient){
        throw new Error('Patient cannot be found');
    }
    return patient;
};
// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const addEntry =(patientId: string,entry: Entry):PatientEntry=>{
     /**
     * {
        *!id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',x
        *!date: '2019-08-05',x
        *!type: 'OccupationalHealthcare',x
        *!specialist: 'MD House',x
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        *!description:x
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
     */
   
    const patient =  patients.find(item=>item.id === patientId);
   
    if(!patient){
        throw new Error('Patient cannot be found');
    }
    if(!entry.type){
        throw new Error('Missing type field');
    }
    if(entry.type!=='Hospital' && entry.type!=='OccupationalHealthcare' && entry.type!=='HealthCheck'){
        throw new Error('Wrong kind of type field');
    }
    if(entry.type==='Hospital' && !entry.discharge){
        throw new Error('Missing discharge field');
    }
    if(entry.type==='OccupationalHealthcare' && !entry.employerName){
        throw new Error('Missing employerName field');
    }
    if(entry.type==='HealthCheck' && !entry.healthCheckRating){
        throw new Error('Missing healthCheckRating field');
    }
    patient.entries.push({...entry,id: uuid()});
    
    return patient;
};

export default {
    getAll,add,getById,addEntry
};