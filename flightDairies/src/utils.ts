//define a function toNewDiaryEntry that receives the request body as a parameter 
//and returns a properly typed NewDiaryEntry object.
//parsing and validating each field we are expecting to receive.

import {NewDiaryEntry, Visibility, Weather} from './types';


//function is a so called type guard.
//That means it is a function which returns a boolean 
//and which has a type predicate as the return type. 
//more info:https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
const isString =(text:unknown): text is string =>{
    //?Why there are two conditions in the string type guard?
    //Most likely the simpler form is good enough for all practical purposes.
    //However, if we want to be absolutely sure, both conditions are needed. 
    return typeof text === 'string' || text instanceof String;
};

//!To validate the comment field we need to check that it exists, 
//and to ensure that it is of the type string.
const parseComment =(comment:unknown):string=>{
    if(!comment || !isString(comment)){
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};

//!Parsing and validating the date object
//Since TypeScript doesn't really know a type for a date, we need to treat it as a string.
const isDate =(date:string):boolean =>{
    return Boolean(Date.parse(date));
};
const parseDate =(date: unknown):string =>{
    if(!date || !isString(date) || ! isDate(date)){
         throw new Error(`Incorrect or missing date ${date}`);
    }
    return date;
};

//!Parsing and validating weather field.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isWeather = (param: any): param is Weather=>{
    return  Object.values(Weather).includes(param);
};
const parseWeather =(weather:unknown):Weather =>{
    if(!weather || !isWeather(weather)){
        throw new Error(`Incorrect or missing weather: ${weather}`);
    }
    return weather;
};

//!Parsing and validating visibility field.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isVisibility =(param: any): param is Visibility=>{
    return Object.values(Visibility).includes(param);
};
const parseVisibility =(visibility:unknown): Visibility =>{
    if(!visibility || !isVisibility(visibility)){
        throw new Error(`Incorrect or missing visibility ${visibility}`);
    }
    return visibility;
};

//!the unknown type does not allow any operations, so also accessing the fields is not possible.
//Todo: fix this by destructuring the fields to variables of the type unknown 
/*
* type Fields = { comment : unknown, date: unknown, weather: unknown, visibility: unknown };
* const toNewDiaryEntry = ({ comment, date, weather, visibility } : Fields): NewDiaryEntry => {
*/
//Todo: The other option to bypass the problem would be to use the type any for the parameter and disable the lint rule for that line:


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewDiaryEntry =(object:any):NewDiaryEntry=>{
    //? parse each field 
    //? and make sure that the return value is exactly of type NewDiaryEntry. 
    //! This means we should check EACH field SEPARATELY.(see above)

    const newEntry : NewDiaryEntry ={
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility)
    };
    return newEntry;
};

