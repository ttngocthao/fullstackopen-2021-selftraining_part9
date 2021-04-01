import React from 'react'

interface IHeader {
    courseName: string
}

const Header = (props: IHeader) => {
    return (
         <h1>{props.courseName}</h1>
    )
}

export default Header
