import { Router,Request,Response } from "express";
import { addNewNote, deleteNote, getAllNotes, updateNote } from "../controllers/noteBookControllers";


const notesRoutes:Router=Router();

notesRoutes.get("/",getAllNotes);
notesRoutes.post("/",addNewNote);
notesRoutes.put("/:id",updateNote);
notesRoutes.delete("/:id",deleteNote);



export default notesRoutes