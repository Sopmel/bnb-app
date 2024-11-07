import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Bookings from './Bookings';

type Message = {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: string;
    sender?: { name: string };
    receiver?: { name: string };
};

type MessagesListProps = {
    userId: string;
};

const MessagesList = ({ userId }: MessagesListProps) => {
    const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
    const [sentMessages, setSentMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'bookings'>('received');
    const [replyContent, setReplyContent] = useState('');
    const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (!userId) return;

        const fetchMessages = async () => {
            try {
                const received = await axios.get(`/api/messages/${userId}/received`);
                const sent = await axios.get(`/api/messages/${userId}/sent`);
                setReceivedMessages(received.data);
                setSentMessages(sent.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to load messages:", error);
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [userId]);

    if (isLoading) {
        return <p>Loading messages...</p>;
    }

    const handleViewProfile = (profileUserId: string) => {
        router.push(`/profile/${profileUserId}`);
    };

    const handleReply = async (receiverId: string) => {
        try {
            const messageResponse = await axios.post(`/api/messages`, {
                content: replyContent,
                senderId: userId,
                receiverId,
            });

            await axios.post('/api/notifications', {
                userId: receiverId,
                message: 'You have a new message',
                type: 'MESSAGE',
                messageId: messageResponse.data.id,  // Kopplar notisen till meddelandet
            });

            setReplyContent('');
            setShowReplyInput(null);
            alert("Reply sent!");
        } catch (error) {
            console.error("Failed to send reply:", error);
        }
    };

    const handleDelete = async (messageId: string) => {
        try {
            await axios.delete(`/api/messages/deleteMessage/${messageId}/delete`);
            setReceivedMessages(prev => prev.filter(msg => msg.id !== messageId));
            alert('Message deleted!');
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '2px solid #ccc', marginBottom: '10px' }}>
                <button onClick={() => setActiveTab('received')} style={{ ...tabButtonStyles(activeTab === 'received') }}>Received Messages</button>
                <button onClick={() => setActiveTab('sent')} style={{ ...tabButtonStyles(activeTab === 'sent') }}>Sent Messages</button>
                <button onClick={() => setActiveTab('bookings')} style={{ ...tabButtonStyles(activeTab === 'bookings') }}>Booking Requests</button>
            </div>

            {/* Content */}
            {activeTab === 'received' && (
                <div>
                    <h2>Received Messages</h2>
                    {receivedMessages.length > 0 ? (
                        <ul>
                            {receivedMessages.map((msg) => (
                                <li key={msg.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                                    <p>
                                        <strong>From:</strong>
                                        <span
                                            onClick={() => handleViewProfile(msg.senderId)}
                                            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
                                        >
                                            {msg.sender?.name}
                                        </span>
                                    </p>
                                    <p>{msg.content}</p>
                                    <p><small>{new Date(msg.timestamp).toLocaleString()}</small></p>

                                    {/* buttons */}
                                    <button onClick={() => handleDelete(msg.id)} style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setShowReplyInput(msg.id)}
                                        style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Reply
                                    </button>

                                    {/* Reply input */}
                                    {showReplyInput === msg.id && (
                                        <div style={{ marginTop: '10px' }}>
                                            <input
                                                type="text"
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Write your reply..."
                                                style={{ padding: '8px', width: '100%', borderRadius: '5px', marginBottom: '5px' }}
                                            />
                                            <button
                                                onClick={() => handleReply(msg.senderId)}
                                                style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No received messages.</p>
                    )}
                </div>
            )}

            {activeTab === 'sent' && (
                <div>
                    <h2>Sent Messages</h2>
                    {sentMessages.length > 0 ? (
                        <ul>
                            {sentMessages.map((msg) => (
                                <li key={msg.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
                                    <p>
                                        <strong>To:</strong>
                                        <span
                                            onClick={() => handleViewProfile(msg.receiverId)}
                                            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', marginLeft: '5px' }}
                                        >
                                            {msg.receiver?.name}
                                        </span></p>
                                    <p>{msg.content}</p>
                                    <p><small>{new Date(msg.timestamp).toLocaleString()}</small></p>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No sent messages.</p>}
                </div>
            )}

            {activeTab === 'bookings' && (
                <Bookings userId={userId} />
            )}
        </div>
    );
};

export default MessagesList;

// Helper function for tab styling
const tabButtonStyles = (isActive: boolean) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #007bff' : 'none',
    color: isActive ? '#007bff' : '#333',
    backgroundColor: 'transparent'
});
