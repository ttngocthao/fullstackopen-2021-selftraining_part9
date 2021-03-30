/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {calculateBMI} from './calculateBmi';
import calculateExercise from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi',(req,res)=>{

  const height =req.query.height;
  const weight = req.query.weight;

  if(!height || !weight) {
    return res.status(400).json({error: 'height and weight are required'});
  }
  if(isNaN(Number(height)) || isNaN(Number(weight))){
    return res.status(400).json({error: "malformatted parameters"});
  }

  return res.status(200).json({
          weight: weight,
          height: height,
          bmi: calculateBMI(Number(height),Number(weight))
        });

});

app.post('/exercises',(req,res)=> {
 
  const dailyExercises = req.body["daily_exercises"];
  const target = req.body.target;

  if(!dailyExercises || !target){
    return res.status(500).json({error: "parameters missing"});
  }

  for(let i=0;i<dailyExercises.length;i++){
    if(isNaN(dailyExercises[i])) return res.status(500).json({ error: "malformatted parameters"});
  }

  const result = calculateExercise(dailyExercises,target);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});