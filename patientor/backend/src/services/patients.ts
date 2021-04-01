import {v1 as uuid} from 'uuid';
import {NewPatientEntry, PatientEntry, PublicPatientEntry} from '../types';
import patients from '../../data/patients.data';

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
   
    return newPatient;
};
export default {
    getAll,add
};