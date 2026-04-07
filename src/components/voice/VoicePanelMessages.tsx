import type {Message} from "../../types/message.ts";

interface VoicePanelMessagesProps {
    conversation: Message[]
}

export default function VoicePanelMessages({conversation}: VoicePanelMessagesProps) {
    return(
        <>
            <div className="voice-panel__messages" id="messages">
                {conversation.length > 0 ? (
                    conversation.map((msg, idx) => (
                        <div key={idx} className={`message message--${msg.role}`}>
                            <div className="message__label">
                                {msg.role === 'ai' ? 'VNR AI' : 'You'}
                            </div>
                            <div className="message__bubble">{msg.content}</div>
                            <div className="message__time">
                                {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="voice-panel__empty">
                        <p>No conversation yet. Start by recording or typing a note below.</p>
                    </div>
                )}
            </div>
        </>
    )
}