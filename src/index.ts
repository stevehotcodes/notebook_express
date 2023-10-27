import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
// import { dbConfig } from './config/config';
import mssql from 'mssql'
import notesRoutes from './routes/notesRouters';

dotenv.config();
const app = express();
app.use(express.json())






app.get('/',notesRoutes)


const port = process.env.PORT || 7000;
app.listen("port",()=>{
    console.log(`server is running on ${port}`)
})