// import { dbConfig } from "../config/config";
import { error } from "console";
import { dbConnectService } from "../services/dbConnectionService";
import { Request,Response } from "express";
import {v4 as uid}  from  "uuid"

interface INote{
    id:string,
    title:string,
    content:string,
    createdAt:string,
    isDeleted:number |0 |1
}






export async function addNewNote(req:Request,res:Response){
    let id=uid()
    let note:INote=req.body

    let {title,content,createdAt}=note;

    let pool=await dbConnectService();
    
  pool?.connect(async (err)=>{
        if(err){
            return err
        }
        else{
            let insertNoteQueryStr=`INSERT INTO  notes VALUES(${id},${title},${content},${createdAt})`;
            let result=await pool?.request().query(insertNoteQueryStr);
            console.log(result)

        }


  })
    
    
}

export async function getAllNotes(req:Response,res:Request){
    let pool=await dbConnectService();
    pool?.connect(async (err)=>{
        if(err){
            return err
        }
        else{
            let insertNoteQueryStr=`SELECT * FROM  notes )`;
            let result=await pool?.request().query(insertNoteQueryStr);
            console.log(result)

        }
    })
}

export async function updateNote(req:Request,res:Response){
    let id=req.params;
    let content:string=req.body;
    let pool=await dbConnectService();

    pool?.connect(async(err)=>{
        if(err){console.log(err)}

        let updatedNoteQueryStr=`UPDATE notes SET content=${content} WHERE id=${id}`;
        let result=await pool?.request().query(updatedNoteQueryStr);
        console.log(result)

    })

}

export async function deleteNote (req:Request,res:Response){
    let id=req.params

    let pool=await dbConnectService();

    pool?.connect(async(err)=>{
        if(err){return err}

        let deletedQueryStr=`UPDATE notes SET isDeleted=1 WHERE isDeleted=0 AND id=${id}`;
        let result=await pool?.request().query(deletedQueryStr);
        console.log(result)
    })



}