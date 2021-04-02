import React from 'react'
//import {IContents,ICourse} from '../interface';
import {CoursePart} from '../App'
import Part from './Part';

interface IContents {
    data: Array<CoursePart>;
}


const Content = (props: IContents) => {
   
    return (
        <div>
            {props.data.map((i:CoursePart,key:number) =>  {
                              
                return ( <Part {...i} key={key}/>)
            })}
        </div>
    )
}

export default Content
