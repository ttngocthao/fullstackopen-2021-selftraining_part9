import express from 'express';
import diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/',(_req,res)=>{
    res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id',(_req,res)=>{
    const diary = diaryService.findById(Number(_req.params.id));
    if(diary){
        res.send(diary);
    }else{
        res.sendStatus(404);
    }
});

router.post('/',(_req,res)=>{
    try {
        const newEntry = toNewDiaryEntry(_req.body);
        const addedEntry = diaryService.addEntry(newEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/',(_req,res)=>{
    res.send('Save a diary!');
});

export default router;