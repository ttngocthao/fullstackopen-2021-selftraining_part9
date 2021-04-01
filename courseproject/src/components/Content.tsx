import React from 'react'
import {IContents,ICourse} from '../interface';



const Content = (props: IContents) => {
    return (
        <div>
            {props.data.map((i:ICourse,key:number) =>  {
                return (
                <p key={key}>
                    {i.name} {i.exerciseCount}
                </p>)
                }
            )}
        </div>
    )
}

export default Content
