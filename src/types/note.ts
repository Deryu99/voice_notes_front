export interface Note {
    id: number,
    title: string,
    summary: string,
    tags: string[],
    createdAt: string,
}

export interface UpdateNotePayload {
    id: number;
    title?: string;
    summary?: string;
}

export interface DeleteNotePayload {
    id: number;
    title?: string;
    summary?: string;
}

export interface DeleteTagPayload {
    id: number;
    tag: string;
}

export interface ImportNotesResult {
    success: boolean;
    imported: number;
    skipped: number;
    errors: string[];
    message?: string;
}

export interface DeleteNoteResult {
    success: boolean;
}

export interface DeleteTagFromNoteResult {
    success: boolean;
    note: Note;
}
