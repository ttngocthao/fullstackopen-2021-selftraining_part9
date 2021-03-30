import express from 'express';

const app = express();

app.use(express.json());

const PORT = 4000;

app.get('/ping',(_req,res)=>{
    console.log('Someone pinged here');
    res.send('pong');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});