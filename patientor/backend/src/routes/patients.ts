import express from 'express';
import {  convertReqToNewPatientEntry} from '../../utils';
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
    try {
        //!convert req.body to the proper type before sending
        //  const newEntry = convertReqToNewEntry(_req.body);
        //  console.log(newEntry);
        // const newEntry = convertReqToNewEntry(_req.body);
        const addedNewEntry = patientsService.addEntry(_req.params.id,_req.body);
         res.json(addedNewEntry);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

export default router;