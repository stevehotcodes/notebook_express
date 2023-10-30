// import { dbConfig } from "../config/config";
import { error } from "console";
import { dbConnectService } from "../services/dbConnectionService";
import { Request,Response } from "express";
import {v4 as uid}  from  "uuid"





export async function addNewNote(req:Request,res:Response){
    let id=uid()
    let note:INote=req.body

    let {title,content}=note;

    let pool=await dbConnectService();

    if(pool?.connected){
        console.log('connected');
        
    }
    
  pool?.connect(async (err)=>{
        if(err){
            return err
        }
        else{
            console.log("hey I am the start of the adding function");
            
            let insertNoteQueryStr=`INSERT INTO notes (id, title, content) VALUES (@id, @title, @content)`;

                await pool?.request()
                .input('id', id)
                .input('title', title)
                .input('content', content)
                .query(insertNoteQueryStr);

            // console.log(result)
             return res.status(200).json({message:"note added"})
        }


  })
    
    
}

export async function getAllNotes(req:Request,res:Response){
    let pool=await dbConnectService();
    pool?.connect(async (err)=>{
        if(err){
            return err
        }
        else{
            let insertNoteQueryStr=`SELECT * FROM  notes `;
            let result=await pool?.request().query(insertNoteQueryStr);
            console.log(result)
            res.status(200).json(result?.recordset)

        }
    })
}

export async function updateNote(req:Request,res:Response){
    let {id}=req.params;
    let {content}=req.body;
    let pool=await dbConnectService();

    pool?.connect(async(err)=>{
        if(err){console.log(err)}

        let updatedNoteQueryStr=`UPDATE notes SET content=@content WHERE id=@id`;
        let result=await pool?.request()
        .input('content',content)
        .input('id',id)
        .query(updatedNoteQueryStr);
        console.log(result)

        return res.status(200).json({message:"note updated"})

    })

}

export async function deleteNote (req:Request,res:Response){
    let {id}=req.params

    let pool=await dbConnectService();

    pool?.connect(async(err:Error)=>{
        if(err){return err.message}

        let deletedQueryStr=`DELETE FROM  notes  WHERE id=@id`;
        let result=await pool?.request()
        .input('id',id)
        .query(deletedQueryStr);
        console.log(result)
        return res.status(200).json({message:"note deleted successfully"})
    })



}