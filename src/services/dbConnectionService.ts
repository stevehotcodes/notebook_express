import { dbConfig } from '../config/config';
import mssql from 'mssql';


export async function dbConnectService(){
            try {
                 let pool = await new mssql.ConnectionPool(dbConfig);
                  return pool; 
            } catch (error) {
                  console.log(error)
            }

}