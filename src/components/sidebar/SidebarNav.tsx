import { useState } from 'react';
import { importNotes as fetchImportNotes } from "../../services/notesApi.tsx";
import ImportResultsDialog from "../ui/ImportResultsDialog.tsx";
import type {ImportNotesResult} from "../../types/note.ts";

interface SidebarNavProps {
    onNotesImported?: () => Promise<void> | void;
}

export default function SidebarNav({onNotesImported}: SidebarNavProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [importResult, setImportResult] = useState<ImportNotesResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImportNotes: () => Promise<void> = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result: ImportNotesResult = await fetchImportNotes();
            setImportResult(result);
            setIsDialogOpen(true);

            if (result.success && onNotesImported) {
                try {
                    await onNotesImported();
                } catch (reloadError) {
                    console.error('Error reloading notes after import:', reloadError);
                }
            }
        } catch (error) {
            console.error('Error importing notes:', error);
            setImportResult({
                success: false,
                imported: 0,
                skipped: 0,
                errors: ['An error occurred while importing notes']
            });
            setIsDialogOpen(true);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <>
            <ImportResultsDialog 
                isOpen={isDialogOpen} 
                result={importResult} 
                onClose={() => setIsDialogOpen(false)} 
            />
            <nav className="sidebar__nav">
                <div className="sidebar__nav-label">Main</div>
                <a href="#" className="sidebar__nav-item sidebar__nav-item--active">
                    <svg className="sidebar__nav-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 00-1 1v3H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7a1 1 0 00-1-1z"/>
                    </svg>
                    Dashboard
                </a>

                <a href="#" className="sidebar__nav-item">
                    <svg className="sidebar__nav-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm1 3h10v1H5V6zm0 3h10v1H5V9zm0 3h6v1H5v-1z"/>
                    </svg>
                    Notes
                </a>

                <a href="#" className="sidebar__nav-item">
                    <svg className="sidebar__nav-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    Contacts
                </a>

                <div className="sidebar__nav-label">System</div>

                <a href="#" className="sidebar__nav-item">
                    <svg className="sidebar__nav-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"/>
                    </svg>
                    Settings
                </a>

                <a href="#" className="sidebar__nav-item"
                    onClick={(e) => {
                        e.preventDefault();
                        handleImportNotes();
                    }}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.6 : 1 }}>
                    <svg className="sidebar__nav-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1m3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    {isLoading ? 'Importing...' : 'Import Notes'}
                </a>
            </nav>
        </>
    )
}