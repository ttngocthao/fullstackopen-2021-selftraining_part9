import React from 'react'
import {IContents} from '../interface'

const Total = (props:IContents) => {
    return (
         <p>
        Number of exercises{" "}
        {props.data.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}

export default Total
