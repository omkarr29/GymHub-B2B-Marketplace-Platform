import React, { useState } from 'react';

const Messages = () => {
  // Requirement #28: Dummy Conversations Dataset
  const initialConversations = [
    {
      id: 1,
      buyerName: 'IronFit Gym & Studios',
      contactPerson: 'Rahul Patil',
      unread: 1,
      lastMessage: 'Sure, I can provide bulk pricing for 10 units.',
      lastMessageTime: '10:35 AM',
      messages: [
        { id: 101, sender: 'buyer', text: 'Hello, we are expanding our Baner branch and need 10 commercial treadmills.', time: '10:15 AM' },
        { id: 102, sender: 'buyer', text: 'Can we get an additional 5% bulk discount over your MOQ price?', time: '10:16 AM' },
        { id: 103, sender: 'supplier', text: 'Hello Rahul! Yes, for 10 units of the T-900, we can offer ₹1,12,000 per unit including freight.', time: '10:30 AM' },
        { id: 104, sender: 'supplier', text: 'Sure, I can provide bulk pricing for 10 units.', time: '10:35 AM' }
      ]
    },
    {
      id: 2,
      buyerName: 'Alpha Fitness Club',
      contactPerson: 'Vikram Mehta',
      unread: 0,
      lastMessage: 'Tracking number BD-EXP-889012 dispatched.',
      lastMessageTime: 'Yesterday',
      messages: [
        { id: 201, sender: 'buyer', text: 'Has order #GH-1023 been handed over to BlueDart?', time: 'Yesterday, 03:00 PM' },
        { id: 202, sender: 'supplier', text: 'Yes Vikram, tracking number BD-EXP-889012 dispatched.', time: 'Yesterday, 04:15 PM' }
      ]
    },
    {
      id: 3,
      buyerName: 'PowerHouse Fitness Studio',
      contactPerson: 'Anand Roy',
      unread: 0,
      lastMessage: 'We have 6 units available in stock right now.',
      lastMessageTime: '16 Aug',
      messages: [
        { id: 301, sender: 'buyer', text: 'Do you have dual cable cross machines ready for immediate delivery?', time: '16 Aug, 11:00 AM' },
        { id: 302, sender: 'supplier', text: 'We have 6 units available in stock right now.', time: '16 Aug, 11:20 AM' }
      ]
    }
  ];

  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [inputText, setInputText] = useState('');

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  // Send message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      id: Date.now(),
      sender: 'supplier',
      text: inputText.trim(),
      time: timeString
    };

    const updatedConversations = conversations.map((conv) => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          lastMessage: inputText.trim(),
          lastMessageTime: timeString,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#211a16' }}>
          Buyer Inquiries & Negotiations
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#534439' }}>
          Direct wholesale inquiry communication channel with gym owners and commercial buyers.
        </p>
      </div>

      {/* Main Messaging Box */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 320px) 1fr',
          backgroundColor: '#fff8f5',
          border: '1px solid #d8c3b5',
          borderRadius: '8px',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden'
        }}
      >
        {/* Left: Conversations Sidebar */}
        <div style={{ borderRight: '1px solid #d8c3b5', display: 'flex', flexDirection: 'column', backgroundColor: '#fff1e9' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #ede0d9', fontWeight: '600', fontSize: '14px', color: '#211a16' }}>
            Conversations ({conversations.length})
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #ede0d9',
                    backgroundColor: isActive ? '#fff8f5' : 'transparent',
                    borderLeft: isActive ? '4px solid #8c4f16' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: '600', fontSize: '13px', color: '#211a16' }}>
                      {conv.buyerName}
                    </span>
                    <span style={{ fontSize: '11px', color: '#857468' }}>{conv.lastMessageTime}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#79573d', marginBottom: '4px' }}>
                    {conv.contactPerson}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#534439',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {conv.lastMessage}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
          {/* Conversation Header */}
          <div
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#211a16' }}>
                {activeConversation.buyerName}
              </h3>
              <span style={{ fontSize: '12px', color: '#79573d' }}>
                Representative: {activeConversation.contactPerson}
              </span>
            </div>
            <a
              href="/supplier/buyers"
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#00687a',
                textDecoration: 'none'
              }}
            >
              View Buyer Profile →
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: '#fdf7f3'
            }}
          >
            {activeConversation.messages.map((msg) => {
              const isSupplier = msg.sender === 'supplier';
              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isSupplier ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSupplier ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: isSupplier ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      backgroundColor: isSupplier ? '#8c4f16' : '#fff1e9',
                      color: isSupplier ? '#ffffff' : '#211a16',
                      border: isSupplier ? 'none' : '1px solid #ede0d9',
                      fontSize: '13px',
                      lineHeight: '18px'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '10px', color: '#857468', marginTop: '4px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Composer */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #d8c3b5',
              backgroundColor: '#fff8f5',
              display: 'flex',
              gap: '10px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Type your message, MOQ quote, or delivery update..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #d8c3b5',
                backgroundColor: '#fff1e9',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#8c4f16',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;