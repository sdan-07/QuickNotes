import type { Request, Response } from "express";
import { noteModel } from "../model/note.schema.js";

export const addNotes = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { title, body } = req.body;
        if (!title || !body)
            return res.status(400).json({message: "All fields are required"});

        const note = await noteModel.create({ title, body });
        return res.status(201).json({message: "note created", note});

    }catch(e){
        console.log(e);
        
        return res.status(500).json({message: "Server failure", e})
    }
}

export const fetchNotes = async (_: Request, res: Response): Promise<Response> => {
    try{
        const notes = await noteModel.find();
        if (notes.length === 0 || !notes)
            return res.status(404).json({message: "No Notes found"});

        return res.status(200).json({message: "notes fetched", notes});

    }catch(e){
        return res.status(500).json({message: "Server failure", e})
    }
}

export const updateNote = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        const { title, body } = req.body;
        if (!title || !body)
            return res.status(400).json({message: "All fields are required"});
        
        //find by id
        //const note = await noteModel.findByIdAndUpdate(id, { title, body }, { new: true });
        const note = await noteModel.findOneAndUpdate({ _id: id }, { title, body }, { new: true });
        if (!note)
            return res.status(404).json({message: "Note not found"});

        return res.status(200).json({message: "note updated", note});

    }catch(e){
        return res.status(500).json({message: "Server failure", e})
    }
}

export const removeNote = async (req: Request, res: Response): Promise<Response> => {
    try{
        const { id } = req.params;
        
        await noteModel.findOneAndDelete({ _id: id });
        return res.status(200).json({message: "note deleted"});

    }catch(e){
        console.error(e);
        
        return res.status(500).json({message: "Server failure", e})
    }
}