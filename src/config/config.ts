import * as dotenv from 'dotenv';

dotenv.config();



export const dbConfig ={
      user: 'sa',
      password: 'Omosh123',
      database: 'NoteBookDB',
      server: 'localhost',
      pool:{
            max: 10,
            min: 1,
            idleTimeoutMillis: 3000
      },
      options:{
            encrypt: false,
            trustCertificate: true
      }
}