"use client";

import MessagesList from '@/app/components/MessagesList';

const MessagesPage = () => {
    const currentUserId = localStorage.getItem('userId');  // Du kan anpassa detta beroende på din autentisering

    if (!currentUserId) {
        return <p>You need to log in to view messages.</p>;
    }

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
            <h1>Your Messages</h1>
            <MessagesList userId={currentUserId} />
        </div>
    );
};

export default MessagesPage;
