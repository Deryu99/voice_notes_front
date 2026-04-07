import './ImportResultsDialog.css';

interface ImportResult {
    success: boolean;
    imported: number;
    skipped: number;
    errors: string[];
}

interface ImportResultsDialogProps {
    isOpen: boolean;
    result: ImportResult | null;
    onClose: () => void;
}

export default function ImportResultsDialog({ isOpen, result, onClose }: ImportResultsDialogProps) {
    if (!isOpen || !result) return null;

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <div className={`dialog-header ${result.success ? 'success' : 'error'}`}>
                    <h2>{result.success ? '✓ Import Successful' : '✗ Import Failed'}</h2>
                </div>
                
                <div className="dialog-body">
                    <div className="result-item">
                        <span className="label">Imported:</span>
                        <span className="value">{result.imported}</span>
                    </div>
                    <div className="result-item">
                        <span className="label">Skipped:</span>
                        <span className="value">{result.skipped}</span>
                    </div>
                    
                    {result.errors.length > 0 && (
                        <div className="errors-section">
                            <span className="label">Errors:</span>
                            <ul className="errors-list">
                                {result.errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="dialog-footer">
                    <button onClick={onClose} className="btn-close">Close</button>
                </div>
            </div>
        </div>
    );
}


