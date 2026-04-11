import * as React from "react";

interface NoteListHeaderProps {
    searchQuery?: string;
    onSearchQueryChange: (query: string) => void;
}
export default function NoteListHeader({searchQuery, onSearchQueryChange}: NoteListHeaderProps): React.JSX.Element {
    return (
        <>
            <div className="notes-list__header">
                <div className="notes-list__title">My Notes</div>
                <div className="notes-list__search">
                    <span className="notes-list__search-icon">⌕</span>
                    <input
                        type="text"
                        className="notes-list__search-input"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(event) => onSearchQueryChange(event.target.value)}
                    />
                </div>
            </div>
        </>
    )
}