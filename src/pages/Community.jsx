import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMessageCircle, FiUser, FiUsers, FiBookOpen, FiClock, FiChevronRight } from 'react-icons/fi';
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

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const UserCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  flex-grow: 1;
`;

const UserName = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const UserBio = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const UserStats = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.glassBorder};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const UserStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserActions = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: ${props => props.theme.colors.textSecondary};
  grid-column: 1 / -1;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const FilterTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const FilterTag = styled.button`
  background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.glass};
  color: ${props => props.active ? '#fff' : props.theme.colors.textSecondary};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.glassBorder};
  border-radius: ${props => props.theme.borderRadius.round};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const MessagePreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MessagePreviewCard = styled(motion.div)`
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.2rem 1.5rem;
  gap: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
`;

const MessageAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MessageInfo = styled.div`
  flex-grow: 1;
`;

const MessageNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const MessageSender = styled.h3`
  font-size: 1.1rem;
  font-weight: ${props => props.unread ? '600' : '400'};
  color: ${props => props.theme.colors.text};
`;

const MessageTime = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const MessageContent = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.cardBackground};
`;

const MessageAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const UnreadBadge = styled.span`
  background: ${props => props.theme.colors.accent};
  color: white;
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.round};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const NoMessages = styled.div`
  text-align: center;
  padding: 3rem;
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ViewMoreButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Format the timestamp for display
const formatMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const Community = () => {
  const { communityUsers, conversations, unreadCount } = useMessagingContext();
  const { user } = useUserContext();
  const [activeTab, setActiveTab] = useState('people');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  
  // Add useEffect to update URL when tab changes
  useEffect(() => {
    // Update URL based on active tab without full navigation
    const url = new URL(window.location);
    url.searchParams.set('tab', activeTab);
    window.history.pushState({}, '', url);
  }, [activeTab]);

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && (tabParam === 'people' || tabParam === 'messages')) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  const filteredUsers = communityUsers
    .filter(user => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bioMatch = user.bio.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || bioMatch;
    })
    .filter(user => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'chefs' && user.recipeCount > 15) return true;
      if (activeFilter === 'bakers' && user.bio.toLowerCase().includes('bak')) return true;
      if (activeFilter === 'photographers' && user.bio.toLowerCase().includes('photo')) return true;
      return false;
    });
  
  const handleMessageUser = (userId) => {
    navigate(`/messages/${userId}`);
  };
  
  const handleViewProfile = (userId) => {
    // This would navigate to a profile page once implemented
    navigate(`/community/profile/${userId}`);
  };
  
  const handleViewConversation = (userId) => {
    navigate(`/messages/${userId}`);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Community</PageTitle>
        <PageDescription>
          Connect with passionate food enthusiasts, share your culinary experiences, and learn from each other. 
          Discover new recipes, techniques, and build relationships with like-minded people.
        </PageDescription>
      </PageHeader>
      
      <CommunityTabs>
        <Tab 
          active={activeTab === 'people'} 
          onClick={() => handleTabChange('people')}
        >
          <FiUsers /> People
        </Tab>
        <Tab 
          active={activeTab === 'messages'} 
          onClick={() => handleTabChange('messages')}
        >
          <FiMessageCircle /> Messages
          {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
        </Tab>
      </CommunityTabs>
      
      {activeTab === 'people' && (
        <>
          <SearchContainer>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search community members..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchContainer>
          
          <FilterTags>
            <FilterTag 
              active={activeFilter === 'all'} 
              onClick={() => handleFilterChange('all')}
            >
              All Members
            </FilterTag>
            <FilterTag 
              active={activeFilter === 'chefs'} 
              onClick={() => handleFilterChange('chefs')}
            >
              Chefs
            </FilterTag>
            <FilterTag 
              active={activeFilter === 'bakers'} 
              onClick={() => handleFilterChange('bakers')}
            >
              Bakers
            </FilterTag>
            <FilterTag 
              active={activeFilter === 'photographers'} 
              onClick={() => handleFilterChange('photographers')}
            >
              Food Photographers
            </FilterTag>
          </FilterTags>
          
          <UsersGrid>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard 
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <UserHeader>
                    <UserAvatar>
                      <img src={user.avatar} alt={user.name} />
                    </UserAvatar>
                    <UserInfo>
                      <UserName>{user.name}</UserName>
                      <UserBio>{user.bio}</UserBio>
                    </UserInfo>
                  </UserHeader>
                  
                  <UserStats>
                    <UserStat>
                      <FiBookOpen />
                      {user.recipeCount} Recipes
                    </UserStat>
                  </UserStats>
                  
                  <UserActions>
                    <Button 
                      variant="glass" 
                      rounded 
                      fullWidth
                      onClick={() => handleViewProfile(user.id)}
                    >
                      <FiUser /> Profile
                    </Button>
                    <Button 
                      variant="primary" 
                      rounded 
                      fullWidth
                      onClick={() => handleMessageUser(user.id)}
                    >
                      <FiMessageCircle /> Message
                    </Button>
                  </UserActions>
                </UserCard>
              ))
            ) : (
              <NoResults>
                <h3>No users found</h3>
                <p>Try adjusting your search or filters to find community members.</p>
              </NoResults>
            )}
          </UsersGrid>
        </>
      )}
      
      {activeTab === 'messages' && (
        <>
          <MessagePreviewList>
            {conversations.length > 0 ? (
              conversations.map(conversation => (
                <MessagePreviewCard 
                  key={conversation.partnerId}
                  onClick={() => handleViewConversation(conversation.partnerId)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageHeader>
                    <MessageAvatar>
                      <img src={conversation.partnerAvatar} alt={conversation.partnerName} />
                    </MessageAvatar>
                    <MessageInfo>
                      <MessageNameRow>
                        <MessageSender unread={conversation.unreadCount > 0}>
                          {conversation.partnerName}
                        </MessageSender>
                        <MessageTime>
                          <FiClock size={12} style={{ marginRight: '4px' }} />
                          {formatMessageTime(conversation.lastMessage.timestamp)}
                        </MessageTime>
                      </MessageNameRow>
                      <MessageContent>
                        {conversation.lastMessage.senderId === user.id ? 'You: ' : ''}
                        {conversation.lastMessage.content}
                      </MessageContent>
                    </MessageInfo>
                  </MessageHeader>
                  <MessageFooter>
                    <MessageAction>
                      View Conversation <FiChevronRight />
                    </MessageAction>
                    {conversation.unreadCount > 0 && (
                      <UnreadBadge>{conversation.unreadCount} new</UnreadBadge>
                    )}
                  </MessageFooter>
                </MessagePreviewCard>
              ))
            ) : (
              <NoMessages>
                <h3>No Messages Yet</h3>
                <p>Start connecting with the community by sending a message to a fellow food enthusiast.</p>
                <Button 
                  variant="primary"
                  rounded
                  onClick={() => setActiveTab('people')}
                >
                  <FiUsers /> Find People to Message
                </Button>
              </NoMessages>
            )}
          </MessagePreviewList>
          
          <ButtonContainer>
            <ViewMoreButton 
              variant="outline" 
              size="large" 
              onClick={() => navigate('/messages')}
            >
              Go to Messages <FiChevronRight />
            </ViewMoreButton>
          </ButtonContainer>
        </>
      )}
    </PageContainer>
  );
};

export default Community; 