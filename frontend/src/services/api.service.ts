import axios from 'axios';
import type { Note } from '../types/types';

const apiUrl = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
    baseURL: `${apiUrl}/api/notes`
});

export const addNotes = async (title: string, body: string): Promise<Note> => {
    const response = await api.post<Note>('/add', { title, body });
    console.log(response);
    
    return response.data.note;
}

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get<{ message: string; notes: Note[] }>('/');
    return response.data.notes;
}

export const updateNotes = async (title: string, body: string, noteId: string): Promise<Note> => {
    const response = await api.put<{ message: string; note: Note }>(`/update/${noteId}`, { title, body });
    return response.data.note;
}

export const removeNotes = async (noteId: string): Promise<Note> => {
    const response = await api.delete<Note>(`/remove/${noteId}`);
    return response.data;
}
