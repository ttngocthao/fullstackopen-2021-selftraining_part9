import express from 'express'
import {calculateBMI} from './calculateBmi'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi',(req,res)=>{

  const height =req.query.height;
  const weight = req.query.weight;

  if(!height || !weight) {
    return res.status(400).json({error: 'height and weight are required'})
  }
  if(isNaN(Number(height)) || isNaN(Number(weight))){
    return res.status(400).json({error: "malformatted parameters"})
  }

  return res.status(200).json({
          weight: weight,
          height: height,
          bmi: calculateBMI(Number(height),Number(weight))
        })

})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});