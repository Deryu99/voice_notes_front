import type {DeleteNotePayload, ImportNotesResult, Note, UpdateNotePayload} from "../types/note.ts";

export async function getNotes(): Promise<Note[]> {
    try {
        const response: Response = await fetch('/api/get-notes');
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        return response.json();
    } catch (error) {
        console.log('Error loading notes: ', error);
        throw error;
    }
}

export async function importNotes(): Promise<ImportNotesResult> {
    try {
        const response: Response = await fetch('/api/import-notes', { method: 'POST' });
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        return response.json();
    } catch (error) {
        console.log('Error importing notes: ', error);
        throw error;
    }
}

export async function updateNote(payload: UpdateNotePayload): Promise<Note> {
    try {
        const response: Response = await fetch('/api/update-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        return response.json();
    } catch (error) {
        console.log('Error updating note: ', error);
        throw error;
    }
}


export async function deleteNote(payload: DeleteNotePayload): Promise<Note> {
    try {
        const response: Response = await fetch('/api/delete-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        return response.json();
    } catch (error) {
        console.log('Error deleting note: ', error);
        throw error;
    }
}

export async function searchNotes(query: string): Promise<Note[]> {
    try {
        const response: Response = await fetch(`/api/search-notes/${encodeURIComponent(query)}`);
        if (!response.ok) {throw new Error(`HTTP ${response.status}`);}
        return response.json();
    } catch (error) {
        console.log('Error searching note note: ', error);
        throw error;
    }
}