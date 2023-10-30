import express, { NextFunction, Request, Response, json } from 'express';
import * as dotenv from 'dotenv';
import { dbConfig } from './config/config';
import mssql from 'mssql'
import notesRoutes from './routes/notesRouters';

dotenv.config();

const app = express();
app.use(json())

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message:error.message
    })
})

// mssql.connect(dbConfig)





// app.get('/',()=>{
//     console.log ("This is my first get request")
// })
app.use('/notes',notesRoutes)


const port = process.env.PORT || 4000;


app.listen(port,()=>{
    console.log(`server is running on ${port}............`)
})