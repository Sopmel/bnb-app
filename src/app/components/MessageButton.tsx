import { useState } from 'react';
import axios from 'axios';

type MessageButtonProps = {
    senderId: string;
    receiverId: string;
};

const MessageButton = ({ senderId, receiverId }: MessageButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendMessage = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const messageResponse = await axios.post('/api/messages', {
                senderId,
                receiverId,
                content: messageContent,
            });

            await axios.post('/api/notifications', {
                userId: receiverId,
                message: 'You have a new message',
                type: 'MESSAGE',
                messageId: messageResponse.data.id,
            });

            alert('Message sent successfully!');
            setIsModalOpen(false);
            setMessageContent('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {

            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
            }}>
                Send Message
            </button>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}>
                        <h2>Send a Message</h2>
                        <textarea
                            placeholder="Write your message here..."
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            style={{ width: '100%', height: '100px', marginTop: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button onClick={() => setIsModalOpen(false)} style={{
                                backgroundColor: '#ccc',
                                color: 'black',
                                padding: '8px 12px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                border: 'none',
                            }}>
                                Cancel
                            </button>
                            <button onClick={handleSendMessage} disabled={isSubmitting} style={{
                                backgroundColor: isSubmitting ? '#999' : '#007bff',
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                border: 'none',
                            }}>
                                {isSubmitting ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MessageButton;
