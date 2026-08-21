import React, { useState } from 'react';
import { conversations as initialConversations } from './data.js';

const Messages = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(initialConversations[0]?.id || null);
  const [draft, setDraft] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSelectConversation = (id) => {
    setActiveId(id);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: false } : c)));
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !activeConversation) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: draft.trim(),
              messages: [...c.messages, { from: 'supplier', text: draft.trim(), time: 'Just now' }],
            }
          : c
      )
    );
    setDraft('');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', height: 'calc(100vh - 64px)', boxSizing: 'border-box' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#211a16' }}>Messages</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#79573d' }}>
          Direct communication with buyers about orders and quotes.
        </p>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          backgroundColor: '#ffffff',
          border: '1px solid #ede0d9',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Conversation List */}
        <div style={{ borderRight: '1px solid #ede0d9', overflowY: 'auto' }}>
          {conversations.length > 0 ? (
            conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  border: 'none',
                  borderBottom: '1px solid #f3e6de',
                  backgroundColor: activeId === conv.id ? '#fff1e9' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#211a16' }}>{conv.buyer}</span>
                  {conv.unread && (
                    <span style={{ width: '8px', height: '8px', borderRadius: '9999px', backgroundColor: '#ba1a1a' }} />
                  )}
                </div>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '12px',
                    color: '#857468',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {conv.lastMessage}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#a8988c' }}>{conv.time}</p>
              </button>
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: '#857468', fontSize: '13px' }}>No messages yet.</div>
          )}
        </div>

        {/* Message Thread */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {activeConversation ? (
            <>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #ede0d9' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#211a16' }}>{activeConversation.buyer}</p>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeConversation.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.from === 'supplier' ? 'flex-end' : 'flex-start',
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: msg.from === 'supplier' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        backgroundColor: msg.from === 'supplier' ? '#00687a' : '#fff1e9',
                        color: msg.from === 'supplier' ? '#ffffff' : '#211a16',
                        fontSize: '13px',
                        lineHeight: '18px',
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '10px', color: '#a8988c', alignSelf: msg.from === 'supplier' ? 'flex-end' : 'flex-start' }}>
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', padding: '14px 20px', borderTop: '1px solid #ede0d9' }}>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d8c3b5',
                    backgroundColor: '#fff8f5',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#00687a',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#857468', fontSize: '13px' }}>
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
