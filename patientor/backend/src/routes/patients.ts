import express from 'express';
import { convertReqToNewPatientEntry } from '../../utils';
const router = express.Router();

import patientsService from '../services/patients';

router.get('/',(_req,res)=>{
    res.send(patientsService.getAll());
});

router.post('/',(_req,res)=>{
    /**
     *  "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": "female",
        "occupation": "Forensic Pathologist"
     */
    //!convert req.body to the proper type before sending
    try {
        const newPatient = convertReqToNewPatientEntry(_req.body);
        const addedPatient = patientsService.add(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).json(error.message);
    }
    res.send(patientsService.add(_req.body));
});

router.get('/:id',(_req,res)=>{
    try {
        const patient = patientsService.getById(_req.params.id);
        res.json(patient);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

export default router;