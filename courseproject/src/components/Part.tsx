import React from 'react'
import { CoursePart } from '../App'
//import {CoursePart} from '../App'
//props:CoursePart

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = (props:CoursePart) => {
    let outcome;
     switch(props.type){
        case 'normal':
            // outcome={name:props.name, exerciseCount: props.exerciseCount,description: props.description};
            outcome = <div><h3>{props.name} {props.exerciseCount}</h3><p>{props.description}</p></div>
            break;
        case 'groupProject':
            //outcome={name:props.name,exerciseCount: props.exerciseCount, groupProjectCount: props.groupProjectCount};
            outcome = <div><h3>{props.name} {props.exerciseCount}</h3><p>project exercise {props.groupProjectCount}</p></div>
            break;
        case 'submission':
            //outcome = {name:props.name,exerciseCount: props.exerciseCount,exerciseSubmissionLink: props.exerciseSubmissionLink};
            outcome = <div><h3>{props.name} {props.exerciseCount}</h3><p>{props.description}</p><p>submit to {props.exerciseSubmissionLink}</p></div>
            break;
         case 'special':
            //outcome = {name:props.name,exerciseCount: props.exerciseCount,exerciseSubmissionLink: props.exerciseSubmissionLink};
            outcome = <div><h3>{props.name} {props.exerciseCount}</h3><p>{props.description}</p><p>submit to {props.requirements.map(r=><span key={r}>{r}, </span>)}</p></div>
            break;
        default:
            return assertNever(props);
    }
    return (
        <div>
           {outcome}
        </div>
    )
}

export default Part
