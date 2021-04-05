import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseWithDescription extends CoursePartBase{
  description: string;
}

export interface CourseNormalPart extends CourseWithDescription{
  type:'normal';
}

export interface CourseProjectPart extends CoursePartBase {
  type:'groupProject';
  groupProjectCount:number;
}

export interface CourseSubmissionPart extends CourseWithDescription {
  type:'submission';
  exerciseSubmissionLink:string;
}

export interface CourseSpecialPart extends CourseWithDescription{
  type:'special';
  requirements:Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];




function App() {
  const courseName = "Half Stack application development";
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
