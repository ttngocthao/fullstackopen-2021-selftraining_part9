import diagnoses from '../../data/diagnoses.data';
import {DiagnoseEntry} from '../types';

const getAll =(): Array<DiagnoseEntry>=>{
    return diagnoses;
};

export default {
    getAll
};