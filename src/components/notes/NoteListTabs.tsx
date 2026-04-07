export default function NoteListTabs(){
    return(
        <>
            <div className="notes-list__tabs">
                <button className="notes-list__tab notes-list__tab--active">All</button>
                <button className="notes-list__tab">Pinned</button>
                <button className="notes-list__tab">Archived</button>
            </div>
        </>
    )
}