// src/App.jsx
import {useEffect, useRef, useState} from 'react';
import './App.css';
import type {Note} from './types/note.ts';
import type {User} from "./types/user.ts";
import type {Message} from "./types/message.ts";
import {deleteNote, getNotes, updateNote} from './services/notesApi.tsx';
import NoteListHeader from "./components/notes/NoteListHeader.tsx";
import NoteListTabs from "./components/notes/NoteListTabs.tsx";
import Sidebar from "./components/layout/Sidebar.tsx";
import VoicePanelHeader from "./components/voice/VoicePanelHeader.tsx";
import VoicePanelMessages from "./components/voice/VoicePanelMessages.tsx";
import NotesList from "./components/notes/NotesList.tsx";
import VoicePanelForm from "./components/voice/VoicePanelForm.tsx";
import NoteDetailsPanel from "./components/notes/NoteDetailsPanel.tsx";
import MoreOptionsModalDialog from "./components/ui/MoreOptionsModalDialog.tsx";

interface AppProps {
    notes?: Note[];
    initialSelectedNote?: Note | null;
    conversation?: Message[];
    searchQuery?: string;
    user?: User;
}

type AutosaveStatus = 'idle' | 'saving' | 'saved' | 'error';

function App({initialSelectedNote = null, conversation = [], searchQuery = '', user = { email: 'myemail@gmail.com' }}: AppProps) {

    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(initialSelectedNote);
    const [titleText, setTitleText] = useState<string>(initialSelectedNote?.title ?? '');
    const [lastSavedTitle, setLastSavedTitle] = useState<string>(initialSelectedNote?.title ?? '');

    const [editorText, setEditorText] = useState<string>(initialSelectedNote?.summary ?? '');
    const [lastSavedText, setLastSavedText] = useState<string>(initialSelectedNote?.summary ?? '');

    const [autosaveStatus, setAutosaveStatus] = useState<AutosaveStatus>('idle');
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState<boolean>(false);
    const saveRequestIdRef = useRef<number>(0);
    const [error, setError] = useState<string | null>(null);

    const loadNotes = async (): Promise<void> => {
        try {
            const loadedNotes: Note[] = await getNotes();
            setNotes(loadedNotes ?? []);
        } catch (error) {
            setError('Could not load notes! ' + error);
        }
    };

    useEffect(():() => void => {
        const loadTimer: number = window.setTimeout((): void => {
            void loadNotes();
        }, 0);

        return (): void => {
            window.clearTimeout(loadTimer);
        };
    }, []);

    useEffect((): void => {
        const messages: HTMLElement|null = document.getElementById('messages');
        if (messages) {
            messages.scrollTop = messages.scrollHeight;
        }
    }, [conversation]);

    useEffect(() => {
        const isTitleDirty: boolean = titleText !== lastSavedTitle;
        const isSummaryDirty: boolean = editorText !== lastSavedText;

        if (!selectedNote || (!isTitleDirty && !isSummaryDirty)) {
            return;
        }

        const currentNoteId: number = selectedNote.id;
        const pendingTitle: string = titleText;
        const pendingText: string = editorText;
        const requestId: number = saveRequestIdRef.current + 1;
        saveRequestIdRef.current = requestId;

        const saveTimer: number = window.setTimeout(async (): Promise<void> => {
            setAutosaveStatus('saving');
            try {
                const updatedNote: Note = await updateNote({ id: currentNoteId, title: pendingTitle, summary: pendingText });

                if (saveRequestIdRef.current !== requestId) {
                    return;
                }

                setTitleText(updatedNote.title);
                setEditorText(updatedNote.summary);
                setLastSavedTitle(updatedNote.title);
                setLastSavedText(updatedNote.summary);
                setAutosaveStatus('saved');
                setNotes((prevNotes: Note[]): Note[] => prevNotes.map((note: Note): Note => (
                    note.id === updatedNote.id ? { ...note, ...updatedNote } : note
                )));
                setSelectedNote((prevSelected: Note | null): Note|null => (
                    prevSelected && prevSelected.id === updatedNote.id ? { ...prevSelected, ...updatedNote } : prevSelected
                ));
            } catch (saveError) {
                if (saveRequestIdRef.current === requestId) {
                    console.error('Autosave failed:', saveError);
                    setAutosaveStatus('error');
                }
            }
        }, 700);

        return (): void => {
            window.clearTimeout(saveTimer);
        };
    }, [selectedNote, titleText, lastSavedTitle, editorText, lastSavedText]);

    const handleSelectNote = (note: Note): void => {
        setSelectedNote(note);
        setTitleText(note.title);
        setLastSavedTitle(note.title);
        setEditorText(note.summary);
        setLastSavedText(note.summary);
        setAutosaveStatus('idle');
    };

    const handleTitleTextChange = (nextTitle: string): void => {
        setTitleText(nextTitle);
        const nextIsDirty: boolean = nextTitle !== lastSavedTitle || editorText !== lastSavedText;
        setAutosaveStatus(nextIsDirty ? 'saving' : 'idle');
    };

    const handleEditorTextChange = (nextText: string): void => {
        setEditorText(nextText);
        const nextIsDirty: boolean = titleText !== lastSavedTitle || nextText !== lastSavedText;
        setAutosaveStatus(nextIsDirty ? 'saving' : 'idle');
    };

    const handleDeleteNote = async (noteId: number): Promise<void> => {
        try {
            await deleteNote({id: noteId});
            setNotes((prevNotes: Note[]): Note[] => prevNotes.filter((note: Note): boolean => note.id !== noteId));
            setSelectedNote((prevSelected: Note | null): Note | null => (
                prevSelected?.id === noteId ? null : prevSelected
            ));
            setTitleText('');
            setLastSavedTitle('');
            setEditorText('');
            setLastSavedText('');
            setAutosaveStatus('idle');
            setIsMoreOptionsOpen(false);
        } catch (deleteError) {
            setError('Could not delete note! ' + deleteError);
            throw deleteError;
        }
    };

    return (
        <div className="app-wrapper">
            <div className="app-frame">

                <Sidebar user={user} onNotesImported={loadNotes} />

                {/* NOTES LIST */}
                <section className="notes-list">
                    <NoteListHeader searchQuery={searchQuery}/>
                    <NoteListTabs />
                    {/* Maybe put errors in a component*/}
                    {error && (<div className="notes-list__empty">{error}</div>)}
                    <NotesList
                        notes={notes}
                        selectedNote={selectedNote}
                        onSelectNote={handleSelectNote}
                    />
                </section>

                {/* VOICE / CHAT PANEL */}
                <main className="voice-panel">
                    <VoicePanelHeader
                        selectedNote={selectedNote}
                        titleValue={titleText}
                        onTitleChange={handleTitleTextChange}
                        onMoreOptionsClick={(): void => setIsMoreOptionsOpen(true)}
                    />
                    <VoicePanelMessages conversation={conversation}/>
                    <VoicePanelForm
                        selectedNote={selectedNote}
                        textValue={editorText}
                        onTextChange={handleEditorTextChange}
                        autosaveStatus={autosaveStatus}
                    />
                </main>

                {/* DETAILS PANEL */}
                <NoteDetailsPanel selectedNote={selectedNote} />
            </div>

            <MoreOptionsModalDialog
                selectedNote={selectedNote}
                isOpen={isMoreOptionsOpen}
                onDeleteNote={handleDeleteNote}
                onClose={(): void => setIsMoreOptionsOpen(false)}
            />
        </div>
    );
}

export default App;

