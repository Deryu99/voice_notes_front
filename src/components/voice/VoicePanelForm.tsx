import type {Note} from "../../types/note.ts";
import * as React from "react";

interface VoicePanelFormProps {
    selectedNote?: Note | null;
    textValue: string;
    onTextChange: (value: string) => void;
    autosaveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export default function VoicePanelForm({selectedNote, textValue, onTextChange, autosaveStatus}: VoicePanelFormProps): React.JSX.Element {
    const autosaveLabel: string = selectedNote
        ? (autosaveStatus === 'saving'
            ? 'Saving...'
            : autosaveStatus === 'saved'
                ? 'Saved'
                : autosaveStatus === 'error'
                    ? 'Save failed'
                    : 'Ready')
        : '';

    return (
        <>
            <div className="composer">
                <form className="composer__form">
                    <div className="composer__box">
                        <textarea
                            className="composer__textarea"
                            placeholder={selectedNote ? 'Edit selected note...' : 'Speak or type your note...'}
                            value={selectedNote ? textValue : ''}
                            onChange={(event) => onTextChange(event.target.value)}
                            disabled={!selectedNote}
                            rows={3}
                        />
                        <div className="composer__actions">
                            <div className="composer__actions-left">
                                <button type="button" className="composer__btn composer__btn--record" id="record-btn">
                                    ⏺ Record
                                </button>
                                <button type="button" className="composer__btn">📎 Attach</button>
                                {selectedNote && (
                                    <span className={`composer__status composer__status--${autosaveStatus}`}>{autosaveLabel}</span>
                                )}
                            </div>
                            <button type="submit" className="composer__send">Send ↵</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}