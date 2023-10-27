import { Router,Request,Response } from "express";
import { addNewNote, deleteNote, getAllNotes, updateNote } from "../controllers/noteBookControllers";


const notesRoutes:Router=Router();
notesRoutes.post("/",addNewNote);
notesRoutes.put("/:id",updateNote);
notesRoutes.delete("/:id",deleteNote);
notesRoutes.get("/notes",getAllNotes);


export default notesRoutes