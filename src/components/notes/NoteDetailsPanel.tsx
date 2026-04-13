import type {Note} from "../../types/note.ts";
import * as React from "react";
import {useState} from "react";

const WAVEFORM_HEIGHTS: number[] = [
    8, 14, 22, 18, 10, 28, 32, 20, 14, 24, 30, 16,
    12, 26, 34, 20, 10, 18, 28, 14, 22, 16, 30, 24,
    10, 18, 22, 14, 28, 32, 18, 12, 26, 20, 14, 30,
    16, 24, 10, 22, 28, 18, 12, 20, 32, 14, 26, 10,
];

interface NoteDetailsPanelProps {
    selectedNote?: Note | null;
    onTagDelete: (noteId: number, tag: string) => Promise<void>;
}
export default function NoteDetailsPanel({selectedNote, onTagDelete}: NoteDetailsPanelProps): React.JSX.Element {
    const [error, setError] = useState<string>('');
    const [deletingTag, setDeletingTag] = useState<string | null>(null);

    const handleDeleteTag = async (tag: string): Promise<void> => {
        if (!selectedNote) {
            return;
        }

        setError('');
        setDeletingTag(tag);
        try {
            await onTagDelete(selectedNote.id, tag);
        } catch (error) {
            setError('Could not delete this note\'s tag. Please try again.');
            console.error('Delete note\'s tag failed: ', error);
        } finally {
            setDeletingTag(null);
        }
    };
    return (
        <aside className="details-panel">
            {selectedNote ? (
                <>
                    <div className="details-panel__header">
                        <div className="details-panel__label">Note details</div>
                        <h3 className="details-panel__title">{selectedNote.title}</h3>
                        <div className="details-panel__meta">
                            <span>{new Date(selectedNote.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            <span>{new Date(selectedNote.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>

                    <div className="details-panel__body">
                        <div className="waveform" aria-hidden="true">
                            {WAVEFORM_HEIGHTS.map((height: number, index: number) => (
                                <div
                                    key={`${height}-${index}`}
                                    className="waveform__bar"
                                    style={{
                                        height: `${height}px`,
                                        opacity: index < 32 ? 0.7 : 0.25,
                                    }}
                                />
                            ))}
                        </div>

                        <div className="details-panel__section-label">Summary</div>
                        <p className="details-panel__text">{selectedNote.summary}</p>

                        {selectedNote.tags?.length > 0 && (
                            <>
                                <div className="details-panel__section-label">Tags</div>
                                <div className="details-panel__tags">
                                    {selectedNote.tags.map((tag: string) => (
                                        <span key={tag} className="details-panel__tag">
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                className="details-panel__tag-remove"
                                                onClick={() => void handleDeleteTag(tag)}
                                                disabled={deletingTag === tag}
                                                aria-label={`Remove tag ${tag}`}
                                                title={`Remove tag ${tag}`}
                                            >
                                                {deletingTag === tag ? '...' : 'x'}
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    {error && <p className="details-panel__error">{error}</p>}
                </>
            ) : (
                <div className="details-panel__empty">
                    <p>Select a note to see its details.</p>
                </div>
            )}
        </aside>
    )
}