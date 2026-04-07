import type {Note} from "../../types/note.ts";

interface NotesListProps {
    notes: Note[],
    selectedNote: Note | null,
    onSelectNote: (note: Note) => void,
}

export default function NotesList({notes, selectedNote, onSelectNote}: NotesListProps) {
    return (
        <>
            <ul className="notes-list__scroll">
                {notes.length > 0 ? (
                    notes.map((note: Note) => (
                        <li key={note.id}
                            className={`note-card ${selectedNote?.id === note.id ? 'note-card--active' : ''}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelectNote(note)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    onSelectNote(note);
                                }
                            }}>
                            <div className="note-card__top">
                                <span className="note-card__title">{note.title}</span>
                                <span className="note-card__date">{new Date(note.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short' })}</span>
                            </div>
                            <p className="note-card__preview">{note.summary}</p>
                            {note.tags?.length > 0 && (
                                <div className="note-card__badges">
                                    {note.tags.map((tag: string, idx: number) => (
                                        <span key={idx} className="note-card__badge">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))
                ) : ( <li className="notes-list__empty">No notes found</li> )}
            </ul>
        </>
    )
}