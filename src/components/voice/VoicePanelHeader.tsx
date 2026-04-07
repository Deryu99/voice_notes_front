import type {Note} from "../../types/note.ts";

interface VoicePanelHeaderProps {
    selectedNote?: Note | null;
    onMoreOptionsClick: () => void;
}
export default function VoicePanelHeader({selectedNote, onMoreOptionsClick}: VoicePanelHeaderProps) {
    return (
        <>
            <div className="voice-panel__header">
                <div>
                    <div className="voice-panel__header-title">
                        {selectedNote ? selectedNote.title : 'Select a note'}
                    </div>
                    <div className="voice-panel__header-subtitle">
                        {selectedNote ? (
                            <>
                                {new Date(selectedNote.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}{' · '}
                            </>
                        ) : ('Start by selecting or recording a note')}
                    </div>
                </div>
                <div className="voice-panel__header-actions">
                    <button type="button" className="icon-btn icon-btn--share" title="Share">↗</button>
                    <button type="button" className="icon-btn icon-btn--more" title="More options" onClick={onMoreOptionsClick}>···</button>
                </div>
            </div>
        </>
    )
}