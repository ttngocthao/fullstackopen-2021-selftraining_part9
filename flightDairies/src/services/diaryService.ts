import diaries from '../../data/diaries';

import {DiaryEntry,NonSensitiveEntry,NewDiaryEntry} from '../types';



const getEntries = (): Array<DiaryEntry>=>{
    return diaries;
};

const addEntry =(entry: NewDiaryEntry): DiaryEntry=>{
    const newEntry ={
        id: Math.max(...diaries.map(d=>d.id))+1,
      ...entry
    };
    diaries.push(newEntry);
    return newEntry;
};

const getNonSensitiveEntries =():NonSensitiveEntry[]=>{

    return diaries.map(({id,date,weather,visibility})=>({
        id,
        date,
        weather,
        visibility
    }));
    
};

const findById =(id:number):DiaryEntry | undefined => {
    const entry = diaries.find(item=>item.id === id); 
    return entry;
};

export default {
    getEntries, addEntry,getNonSensitiveEntries,findById
};