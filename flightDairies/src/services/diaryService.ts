import diaries from '../../data/diaries';

import {DiaryEntry,NonSensitiveEntry} from '../types';



const getEntries = (): Array<DiaryEntry>=>{
    return diaries;
};

const addEntry =()=>{
    return null;
};

const getNonSensitiveEntries =():NonSensitiveEntry[]=>{

    return diaries.map(({id,date,weather,visibility})=>({
        id,
        date,
        weather,
        visibility
    }));
    
};

export default {
    getEntries, addEntry,getNonSensitiveEntries
};