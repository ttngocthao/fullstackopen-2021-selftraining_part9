import {PublicPatientEntry} from '../types';
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

export default {
    getAll
};