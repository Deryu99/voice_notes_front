import {useLayoutEffect, useRef} from "react";
import type {Note} from "../../types/note.ts";
import * as React from "react";

interface VoicePanelHeaderProps {
    selectedNote?: Note | null;
    titleValue: string;
    onTitleChange: (value: string) => void;
    onMoreOptionsClick: () => void;
}
export default function VoicePanelHeader({selectedNote, titleValue, onTitleChange, onMoreOptionsClick}: VoicePanelHeaderProps): React.JSX.Element {
    const titleFieldRef = useRef<HTMLTextAreaElement | null>(null);

    useLayoutEffect((): void => {
        if (!selectedNote || !titleFieldRef.current) {
            return;
        }

        const field: HTMLTextAreaElement = titleFieldRef.current;
        field.style.height = '0px';
        field.style.height = `${field.scrollHeight}px`;
    }, [selectedNote, titleValue]);

    return (
        <>
            <div className="voice-panel__header">
                <div className="voice-panel__header-main">
                    <div className="voice-panel__header-title">
                        {selectedNote ? (
                            <textarea
                                ref={titleFieldRef}
                                className="voice-panel__title-input"
                                value={titleValue}
                                onChange={(event) => onTitleChange(event.target.value)}
                                placeholder="Note title"
                                rows={1}
                            />
                        ) : 'Select a note'}
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