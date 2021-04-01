import express from 'express';
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
    res.send(patientsService.add(_req.body));
});

export default router;