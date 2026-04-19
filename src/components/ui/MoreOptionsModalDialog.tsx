import * as React from "react";
import type {Note} from "../../types/note.ts";

interface MoreOptionsModalDialogProps {
    selectedNote?: Note | null;
    isOpen: boolean;
    onDeleteNote: (noteId: number) => Promise<void>;
    onClose: () => void;
}

export default function MoreOptionsModalDialog({selectedNote, isOpen, onDeleteNote, onClose}: MoreOptionsModalDialogProps): React.JSX.Element | null {
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
    const [deleteError, setDeleteError] = React.useState<string>('');

    if (!isOpen) {
        return null;
    }

    const handleDeleteNote = async (): Promise<void> => {
        if (!selectedNote) {
            return;
        }

        setDeleteError('');
        setIsDeleting(true);
        try {
            await onDeleteNote(selectedNote.id);
        } catch (error) {
            setDeleteError('Could not delete this note. Please try again.');
            console.error('Delete note failed: ', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="dialog" onClick={onClose}>
            <div className="dialog__panel" onClick={(event) => event.stopPropagation()}>
                <div className="dialog__header">
                    <h2 className="dialog__title">More options</h2>
                </div>

                <div className="dialog__body">
                    <p>{selectedNote ? `Actions for "${selectedNote.title}".` : 'No note selected.'}</p>
                    {deleteError && <p className="dialog__error">{deleteError}</p>}
                </div>

                <div className="dialog__footer">
                    <button
                        type="button"
                        className="dialog__button dialog__button--secondary"
                        onClick={() => void handleDeleteNote()}
                        disabled={!selectedNote || isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete note'}
                    </button>
                    <button onClick={onClose} className="dialog__button dialog__button--close">Close</button>
                </div>
            </div>
        </div>
    );
}