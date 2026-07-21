export type Note = {
    note: Note | PromiseLike<Note>;
    _id: string,
    id: number;
    title: string;
    body: string;
    timestamp: string;
};