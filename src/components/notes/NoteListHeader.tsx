interface NoteListHeaderProps {
    searchQuery?: string
}
export default function NoteListHeader({searchQuery}: NoteListHeaderProps){
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
                        onChange={() => { /* handle search */ }}
                    />
                </div>
            </div>
        </>
    )
}