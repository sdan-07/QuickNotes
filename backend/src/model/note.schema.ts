import mongoose, { Model, type Document } from "mongoose";

interface NoteType extends Document {
  timestamp: Date;
  title: string;
  body: string;
}

const noteSchema = new mongoose.Schema<NoteType>({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
});

export const noteModel: Model<NoteType> = mongoose.model<NoteType>(
  "note",
  noteSchema,
);
