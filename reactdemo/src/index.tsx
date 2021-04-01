import React from 'react';
import ReactDOM from 'react-dom';



interface WelcomeProps {
  name: string;
}

const Welcome =(props: WelcomeProps)=>{
  return <h1>Hello {props.name}</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <Welcome name='Thao'/>
  </React.StrictMode>,
  document.getElementById('root')
);

