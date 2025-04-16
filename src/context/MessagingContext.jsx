import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUserContext } from './UserContext';

const MessagingContext = createContext();

export const useMessagingContext = () => useContext(MessagingContext);

// Sample messaging data
const sampleMessages = [
  {
    id: 1,
    senderId: 2,
    recipientId: 1,
    content: "Hi there! I tried your pasta recipe and it was amazing!",
    timestamp: "2023-11-24T14:23:00Z",
    isRead: true,
  },
  {
    id: 2,
    senderId: 3,
    recipientId: 1,
    content: "Could you share some tips for making the perfect sourdough bread?",
    timestamp: "2023-11-25T09:15:00Z",
    isRead: false,
  },
  {
    id: 3,
    senderId: 1,
    recipientId: 2,
    content: "Thank you! I'm glad you enjoyed it. Let me know if you try any of my other recipes!",
    timestamp: "2023-11-24T15:45:00Z",
    isRead: true,
  },
  {
    id: 4,
    senderId: 4,
    recipientId: 1,
    content: "I'm hosting a dinner party next weekend. Any recommendations for vegetarian main dishes?",
    timestamp: "2023-11-26T18:30:00Z",
    isRead: false,
  },
  {
    id: 5,
    senderId: 1,
    recipientId: 4,
    content: "Absolutely! My roasted vegetable lasagna is always a hit. I'll send you the recipe.",
    timestamp: "2023-11-26T19:05:00Z",
    isRead: true,
  },
  {
    id: 6,
    senderId: 1,
    recipientId: 3,
    content: "For sourdough bread, the key is maintaining a healthy starter and controlling fermentation time and temperature. Would you like me to share my starter recipe?",
    timestamp: "2023-11-25T10:30:00Z",
    isRead: true,
  },
  {
    id: 7,
    senderId: 3,
    recipientId: 1,
    content: "That would be amazing! I've been struggling with getting my starter active enough.",
    timestamp: "2023-11-25T11:20:00Z",
    isRead: false,
  },
  {
    id: 8,
    senderId: 5,
    recipientId: 1,
    content: "Hello! I noticed you've posted several fusion Asian recipes. I'd love to collaborate on a cooking workshop sometime.",
    timestamp: "2023-11-27T08:45:00Z",
    isRead: false,
  },
  {
    id: 9,
    senderId: 1,
    recipientId: 5,
    content: "That sounds like a fantastic idea! I've been exploring different regional cuisines lately and would love to share techniques.",
    timestamp: "2023-11-27T09:30:00Z",
    isRead: true,
  },
  {
    id: 10,
    senderId: 4,
    recipientId: 1,
    content: "Thanks for the lasagna suggestion! Do you think it would work if I add some plant-based protein to make it more substantial?",
    timestamp: "2023-11-27T12:15:00Z",
    isRead: false,
  }
];

// Sample users for the community
const sampleUsers = [
  {
    id: 2,
    name: "Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bio: "Professional chef with a passion for Mediterranean cuisine.",
    recipeCount: 28,
  },
  {
    id: 3,
    name: "Marco Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bio: "Home baker exploring the art of pastry and bread making.",
    recipeCount: 12,
  },
  {
    id: 4,
    name: "Aisha Johnson",
    avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bio: "Food photographer and vegan recipe developer.",
    recipeCount: 19,
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    bio: "Culinary explorer specializing in fusion Asian cuisine.",
    recipeCount: 24,
  }
];

export const MessagingProvider = ({ children }) => {
  const { user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [communityUsers, setCommunityUsers] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    // Load messages from localStorage or initialize with sample data
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing saved messages:", error);
        setMessages(sampleMessages);
        localStorage.setItem('messages', JSON.stringify(sampleMessages));
      }
    } else {
      setMessages(sampleMessages);
      localStorage.setItem('messages', JSON.stringify(sampleMessages));
    }
    
    // Load community users
    const savedUsers = localStorage.getItem('communityUsers');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setCommunityUsers(parsedUsers);
      } catch (error) {
        console.error("Error parsing saved users:", error);
        setCommunityUsers(sampleUsers);
        localStorage.setItem('communityUsers', JSON.stringify(sampleUsers));
      }
    } else {
      setCommunityUsers(sampleUsers);
      localStorage.setItem('communityUsers', JSON.stringify(sampleUsers));
    }
  }, []);
  
  // Update conversations when messages or user changes
  useEffect(() => {
    if (user && messages.length > 0) {
      // Create a list of unique conversation partners
      const conversationPartners = [];
      const conversationsMap = new Map();
      
      messages.forEach(message => {
        if (message.senderId === user.id || message.recipientId === user.id) {
          const partnerId = message.senderId === user.id ? message.recipientId : message.senderId;
          
          if (!conversationsMap.has(partnerId)) {
            const partner = communityUsers.find(u => u.id === partnerId);
            if (partner) {
              conversationsMap.set(partnerId, {
                partnerId,
                partnerName: partner.name,
                partnerAvatar: partner.avatar,
                lastMessage: message,
                unreadCount: message.recipientId === user.id && !message.isRead ? 1 : 0
              });
              conversationPartners.push(partnerId);
            }
          } else {
            const conversation = conversationsMap.get(partnerId);
            
            // Update last message if this one is newer
            if (new Date(message.timestamp) > new Date(conversation.lastMessage.timestamp)) {
              conversation.lastMessage = message;
            }
            
            // Update unread count
            if (message.recipientId === user.id && !message.isRead) {
              conversation.unreadCount += 1;
            }
          }
        }
      });
      
      const conversationsList = Array.from(conversationsMap.values())
        .sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp));
      
      setConversations(conversationsList);
      
      // Calculate total unread count
      const totalUnread = conversationsList.reduce((sum, conv) => sum + conv.unreadCount, 0);
      setUnreadCount(totalUnread);
    }
  }, [user, messages, communityUsers]);
  
  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error("Error saving messages to localStorage:", error);
      }
    }
  }, [messages]);
  
  // Send a new message
  const sendMessage = (recipientId, content) => {
    const newMessage = {
      id: Date.now(),
      senderId: user.id,
      recipientId: parseInt(recipientId),
      content,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      // Ensure messages are saved to localStorage
      try {
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
      } catch (error) {
        console.error("Error saving new message to localStorage:", error);
      }
      return updatedMessages;
    });
  };
  
  // Mark messages as read
  const markAsRead = (partnerId) => {
    if (!partnerId) return;
    
    setMessages(prev => {
      const updatedMessages = prev.map(message => 
        message.senderId === parseInt(partnerId) && 
        message.recipientId === user.id && 
        !message.isRead
          ? { ...message, isRead: true }
          : message
      );
      
      // Ensure read status is saved to localStorage
      try {
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
      } catch (error) {
        console.error("Error saving read status to localStorage:", error);
      }
      
      return updatedMessages;
    });
  };
  
  // Get messages for a specific conversation
  const getConversationMessages = (partnerId) => {
    if (!partnerId || !user) return [];
    
    return messages.filter(
      message => 
        (message.senderId === user.id && message.recipientId === parseInt(partnerId)) ||
        (message.senderId === parseInt(partnerId) && message.recipientId === user.id)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };
  
  const contextValue = {
    messages,
    conversations,
    communityUsers,
    activeConversation,
    unreadCount,
    setActiveConversation,
    sendMessage,
    markAsRead,
    getConversationMessages
  };
  
  return (
    <MessagingContext.Provider value={contextValue}>
      {children}
    </MessagingContext.Provider>
  );
};

export default MessagingContext; 