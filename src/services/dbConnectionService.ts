import { dbConfig } from '../config/config';
import mssql from 'mssql';




export async function dbConnectService(){
            try {
                 let pool = await mssql.connect(dbConfig);
                 console.log("database connected successfully")
                  return pool; 
            } catch (error) {
                  console.log(error)
            }

}