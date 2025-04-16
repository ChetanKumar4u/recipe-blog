import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FiUsers, 
  FiMessageCircle, 
  FiSearch, 
  FiSend, 
  FiChevronLeft, 
  FiMoreVertical, 
  FiSmile,
  FiX
} from 'react-icons/fi';
import { useMessagingContext } from '../context/MessagingContext';
import { useUserContext } from '../context/UserContext';
import Button from '../components/common/Button';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 100px 16px 40px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 700px;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CommunityTabs = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
    transition: background 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const UnreadBadge = styled.span`
  background: ${props => props.theme.colors.accent};
  color: white;
  font-size: 0.75rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

const MessagesGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  height: 600px;
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ConversationsSidebar = styled.div`
  border-right: 1px solid ${props => props.theme.colors.glassBorder};
  overflow-y: auto;
  display: ${props => props.isMobile && props.showChat ? 'none' : 'block'};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  }
`;

const SearchConversation = styled.div`
  padding: 1rem;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConversationItem = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  background: ${props => props.active ? props.theme.colors.cardBackground : 'transparent'};
  
  &:hover {
    background: ${props => props.theme.colors.cardBackground};
  }
`;

const ConversationAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ConversationInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const ConversationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const ConversationName = styled.div`
  font-weight: ${props => props.unread ? '600' : '400'};
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ConversationTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ConversationPreview = styled.div`
  font-size: 0.9rem;
  color: ${props => props.unread ? props.theme.colors.text : props.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoConversations = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${props => props.theme.colors.textSecondary};
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ChatContainer = styled.div`
  display: ${props => !props.isMobile || props.showChat ? 'flex' : 'none'};
  flex-direction: column;
  height: 100%;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ChatPartnerInfo = styled.div`
  flex-grow: 1;
`;

const ChatPartnerName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const OnlineStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.accent};
`;

const ChatOptions = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MessageList = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: ${props => props.sent ? 'flex-end' : 'flex-start'};
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  background: ${props => props.sent ? props.theme.colors.primary : props.theme.colors.cardBackground};
  color: ${props => props.sent ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.large};
  border-bottom-right-radius: ${props => props.sent ? '4px' : props.theme.borderRadius.large};
  border-bottom-left-radius: ${props => !props.sent ? '4px' : props.theme.borderRadius.large};
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ChatInputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.colors.glassBorder};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SendButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    background: ${props => props.theme.colors.accent};
  }
`;

const NoChatSelected = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
  padding: 2rem;
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.glassBorder};
  }
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    max-width: 400px;
    margin-bottom: 1.5rem;
  }
`;

const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const Messages = () => {
  const { userId } = useParams();
  const { 
    conversations, 
    communityUsers,
    getConversationMessages, 
    sendMessage, 
    markAsRead,
    activeConversation,
    setActiveConversation,
    unreadCount
  } = useMessagingContext();
  const { user } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messageListRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If a userId is provided in the URL, set it as the active conversation
    if (userId) {
      const partnerId = parseInt(userId);
      setActiveConversation(partnerId);
      setShowChat(true);
      
      // Mark messages as read
      markAsRead(partnerId);
    }
  }, [userId, setActiveConversation, markAsRead]);
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    conversation => 
      conversation.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get messages for the active conversation
  const activeMessages = activeConversation 
    ? getConversationMessages(activeConversation) 
    : [];
  
  // Get partner info for the active conversation
  const partner = communityUsers.find(u => u.id === activeConversation);
  
  // Scroll to bottom of message list when new messages are added
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [activeMessages]);
  
  const handleConversationClick = (partnerId) => {
    setActiveConversation(partnerId);
    markAsRead(partnerId);
    setShowChat(true);
    navigate(`/messages/${partnerId}`);
  };
  
  const handleSendMessage = () => {
    if (messageText.trim() && activeConversation) {
      sendMessage(activeConversation, messageText);
      setMessageText('');
      
      // Force scroll to bottom after sending a message
      setTimeout(() => {
        if (messageListRef.current) {
          messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
      }, 100);
    }
  };
  
  const handleBackClick = () => {
    setShowChat(false);
  };
  
  const handleStartConversation = () => {
    navigate('/community');
  };
  
  // Group messages by sender to show in bubbles
  const groupedMessages = activeMessages.reduce((groups, message, i) => {
    const isSent = message.senderId === user.id;
    const prevMessage = activeMessages[i - 1];
    const isSameSender = prevMessage && prevMessage.senderId === message.senderId;
    
    if (isSameSender) {
      groups[groups.length - 1].messages.push(message);
    } else {
      groups.push({
        sent: isSent,
        messages: [message]
      });
    }
    
    return groups;
  }, []);
  
  // Check if on mobile
  const isMobile = window.innerWidth < 768;
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Messages</PageTitle>
        <PageDescription>
          Connect with other food enthusiasts, share recipes, ask questions, and build your culinary network.
        </PageDescription>
      </PageHeader>
      
      <CommunityTabs>
        <Tab 
          active={false} 
          onClick={() => navigate('/community')}
        >
          <FiUsers /> People
        </Tab>
        <Tab 
          active={true} 
          onClick={() => {}}
        >
          <FiMessageCircle /> Messages
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </Tab>
      </CommunityTabs>
      
      <MessagesGrid>
        <ConversationsSidebar isMobile={isMobile} showChat={showChat}>
          <SearchConversation>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchConversation>
          
          <ConversationList>
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <ConversationItem 
                  key={conversation.partnerId}
                  active={activeConversation === conversation.partnerId}
                  onClick={() => handleConversationClick(conversation.partnerId)}
                >
                  <ConversationAvatar>
                    <img src={conversation.partnerAvatar} alt={conversation.partnerName} />
                  </ConversationAvatar>
                  
                  <ConversationInfo>
                    <ConversationHeader>
                      <ConversationName unread={conversation.unreadCount > 0}>
                        {conversation.partnerName}
                      </ConversationName>
                      <ConversationTime>
                        {formatMessageDate(conversation.lastMessage.timestamp)}
                      </ConversationTime>
                    </ConversationHeader>
                    
                    <ConversationPreview unread={conversation.unreadCount > 0}>
                      {conversation.lastMessage.content}
                    </ConversationPreview>
                  </ConversationInfo>
                </ConversationItem>
              ))
            ) : (
              <NoConversations>
                <p>No conversations found.</p>
                <Button variant="primary" onClick={handleStartConversation}>
                  Find People to Message
                </Button>
              </NoConversations>
            )}
          </ConversationList>
        </ConversationsSidebar>
        
        <ChatContainer isMobile={isMobile} showChat={showChat}>
          {activeConversation && partner ? (
            <>
              <ChatHeader>
                <BackButton onClick={handleBackClick}>
                  <FiChevronLeft size={24} />
                </BackButton>
                
                <ConversationAvatar>
                  <img src={partner.avatar} alt={partner.name} />
                </ConversationAvatar>
                
                <ChatPartnerInfo>
                  <ChatPartnerName>{partner.name}</ChatPartnerName>
                  <OnlineStatus>Online</OnlineStatus>
                </ChatPartnerInfo>
                
                <ChatOptions>
                  <FiMoreVertical />
                </ChatOptions>
              </ChatHeader>
              
              <MessageList ref={messageListRef}>
                <AnimatePresence>
                  {groupedMessages.map((group, index) => (
                    <MessageGroup key={index} sent={group.sent}>
                      {group.messages.map((message, i) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Message sent={group.sent}>
                            {message.content}
                          </Message>
                          {i === group.messages.length - 1 && (
                            <MessageTime>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </MessageTime>
                          )}
                        </motion.div>
                      ))}
                    </MessageGroup>
                  ))}
                </AnimatePresence>
              </MessageList>
              
              <ChatInputContainer>
                <EmojiButton>
                  <FiSmile />
                </EmojiButton>
                
                <MessageInput 
                  type="text" 
                  placeholder="Type a message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <SendButton onClick={handleSendMessage}>
                  <FiSend />
                </SendButton>
              </ChatInputContainer>
            </>
          ) : (
            <NoChatSelected>
              <FiMessageCircle />
              <h3>No conversation selected</h3>
              <p>
                Choose a conversation from the sidebar or start a new conversation 
                by finding people in the community.
              </p>
              <Button 
                variant="primary" 
                onClick={handleStartConversation}
              >
                Find People to Message
              </Button>
            </NoChatSelected>
          )}
        </ChatContainer>
      </MessagesGrid>
    </PageContainer>
  );
};

export default Messages; 