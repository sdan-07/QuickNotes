import { Router } from "express";
import { addNotes, fetchNotes, removeNote, updateNote } from "../controller/note.controller.js";

const router = Router();

router.post('/add', addNotes);

router.get('/', fetchNotes)

router.delete('/remove/:id', removeNote)

router.put('/update/:id', updateNote)

export default router;