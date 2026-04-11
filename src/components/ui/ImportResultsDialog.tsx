
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
        <div className="dialog" onClick={onClose}>
            <div className="dialog__panel" onClick={(e) => e.stopPropagation()}>
                <div className={`dialog__header ${result.success ? 'dialog__header--success' : 'dialog__header--error'}`}>
                    <h2 className="dialog__title">{result.success ? '✓ Import Successful' : '✗ Import Failed'}</h2>
                </div>
                
                <div className="dialog__body">
                    <div className="dialog__row">
                        <span className="dialog__label">Imported:</span>
                        <span className="dialog__value">{result.imported}</span>
                    </div>
                    <div className="dialog__row">
                        <span className="dialog__label">Skipped:</span>
                        <span className="dialog__value">{result.skipped}</span>
                    </div>
                    
                    {result.errors.length > 0 && (
                        <div className="dialog__errors">
                            <span className="dialog__label">Errors:</span>
                            <ul className="dialog__list">
                                {result.errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="dialog__footer">
                    <button onClick={onClose} className="dialog__button dialog__button--close">Close</button>
                </div>
            </div>
        </div>
    );
}


