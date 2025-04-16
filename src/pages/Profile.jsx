import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEdit2, FiUser, FiMail, FiInfo, FiCheck } from 'react-icons/fi';
import { useUserContext } from '../context/UserContext';
import Button from '../components/common/Button';

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 100px 16px 40px;
  }
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled.div`
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 2rem;
  text-align: center;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  border: 3px solid ${props => props.theme.colors.accent};
`;

const AvatarEditButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Username = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const ProfileActions = styled.div`
  margin-top: 1.5rem;
`;

const ProfileMainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProfileSection = styled.div`
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    border-color: ${props => props.theme.colors.accent};
    outline: none;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 0.75rem;
  background: rgba(0, 128, 0, 0.1);
  border-radius: ${props => props.theme.borderRadius.small};
  color: green;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Profile = () => {
  const { user, updateProfile } = useUserContext();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    updateProfile({
      ...user,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    });
    
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <ProfileContainer>
      <PageTitle>Your Profile</PageTitle>
      
      <ProfileContent>
        <ProfileSidebar>
          <Avatar src={user.avatar || 'https://via.placeholder.com/150'}>
            <AvatarEditButton>
              <FiEdit2 size={16} />
            </AvatarEditButton>
          </Avatar>
          <Username>{user.name}</Username>
          <UserEmail>{user.email}</UserEmail>
          <ProfileActions>
            <Button variant="gradient" fullWidth>
              My Recipes
            </Button>
          </ProfileActions>
        </ProfileSidebar>
        
        <ProfileMainContent>
          <ProfileSection>
            <SectionTitle>
              <FiInfo /> Personal Information
            </SectionTitle>
            
            <form onSubmit={handleSubmit}>
              {showSuccess && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheck /> Profile updated successfully!
                </SuccessMessage>
              )}
              
              <FormGroup>
                <Label htmlFor="name">
                  <FiUser style={{ marginRight: '0.5rem' }} />
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">
                  <FiMail style={{ marginRight: '0.5rem' }} />
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="bio">About Me</Label>
                <TextArea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about yourself and your cooking preferences..."
                />
              </FormGroup>
              
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </form>
          </ProfileSection>
        </ProfileMainContent>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile; 