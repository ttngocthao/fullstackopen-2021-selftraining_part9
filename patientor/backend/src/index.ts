import express from 'express';
import cors from 'cors';
import diagnosesService from './routes/diagnoses';


const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3001;

app.get('/api/ping',(_req,res)=>{
    
    res.send(`
        Ping is called
    `);
});

app.use('/api/diagnoses',diagnosesService);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});