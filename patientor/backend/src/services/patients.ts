import {v1 as uuid} from 'uuid';
import {NewPatientEntry, PatientEntry, PublicPatientEntry, NewEntry} from '../types';
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

const addEntry =(patientId: string,entry: NewEntry):PatientEntry=>{   
   
    const patient =  patients.find(item=>item.id === patientId);
   
    if(!patient){
        throw new Error('Patient cannot be found');
    }
 
    patient.entries.push({...entry,id: uuid()});
    
    return patient;
};

export default {
    getAll,add,getById,addEntry
};