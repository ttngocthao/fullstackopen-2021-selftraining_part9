import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content data={courseParts}/>
     
      <hr/>
      <Total data={courseParts}/>
      
    </div>
  );
}

export default App;
