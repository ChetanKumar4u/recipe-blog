import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiTwitter, FiInstagram, FiYoutube, FiLinkedin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: linear-gradient(to bottom, transparent, ${props => props.theme.colors.background});
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 4rem 0 2rem;
  position: relative;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${props => props.theme.colors.glassBorder};
    opacity: 0.5;
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled(Link)`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 700;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  margin-bottom: 1.5rem;
  display: block;
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  max-width: 300px;
`;

const FooterTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 2rem;
    height: 2px;
    background: ${props => props.theme.colors.primary};
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all ${props => props.theme.transitions.fast};
  position: relative;
  width: fit-content;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(5px);
  }
  
  &::before {
    content: '→';
    position: absolute;
    left: -1rem;
    opacity: 0;
    transition: all ${props => props.theme.transitions.fast};
  }
  
  &:hover::before {
    opacity: 1;
    left: -1.5rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${props => props.theme.colors.glass};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(98, 0, 234, 0.3);
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const NewsletterInput = styled.input`
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.8rem 1rem;
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.7;
  }
`;

const SubscribeButton = styled.button`
  background: ${props => props.theme.colors.gradientPrimary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(98, 0, 234, 0.4);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterLogo to="/">CuisineX</FooterLogo>
          <FooterDescription>
            Exploring the future of food through innovative recipes, techniques, and culinary artistry.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </SocialLink>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FiYoutube />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </SocialLink>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinks>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/categories">Categories</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Categories</FooterTitle>
          <FooterLinks>
            <FooterLink to="/categories/molecular">Molecular</FooterLink>
            <FooterLink to="/categories/desserts">Desserts</FooterLink>
            <FooterLink to="/categories/main-courses">Main Courses</FooterLink>
            <FooterLink to="/categories/vegetarian">Vegetarian</FooterLink>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>Newsletter</FooterTitle>
          <FooterDescription>
            Subscribe to our newsletter for the latest recipes and culinary innovations.
          </FooterDescription>
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your email address" />
            <SubscribeButton type="submit">Subscribe</SubscribeButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <div className="container">
        <Copyright>
          © {currentYear} CuisineX. All rights reserved. Designed by <a href="/" target="_blank" rel="noopener noreferrer">YourName</a>
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer; 