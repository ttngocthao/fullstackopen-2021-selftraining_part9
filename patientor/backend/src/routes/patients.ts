import express from 'express';
import {  convertReqToNewPatientEntry,convertReqToNewEntry} from '../../utils';
const router = express.Router();

import patientsService from '../services/patients';

router.get('/',(_req,res)=>{
    res.send(patientsService.getAll());
});

router.post('/',(_req,res)=>{
    //!convert req.body to the proper type before sending
    try {
        const newPatient = convertReqToNewPatientEntry(_req.body);
        const addedPatient = patientsService.add(newPatient);
        res.json(addedPatient);
    } catch (error) {
        res.status(400).json(error.message);
    }
  //  res.send(patientsService.add(_req.body));
});

router.get('/:id',(_req,res)=>{
    try {
        const patient = patientsService.getById(_req.params.id);
        res.json(patient);
    } catch (error) {
        res.status(400).json(error.message);
    }
});


router.post('/:id/entries',(_req,res)=>{   
   
    try {
        //!convert req.body to the proper type before sending        
         const newEntry = convertReqToNewEntry(_req.body);
        const addedNewEntry = patientsService.addEntry(_req.params.id,newEntry);
         res.json(addedNewEntry);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

export default router;