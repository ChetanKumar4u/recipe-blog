import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FiSend } from 'react-icons/fi';

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
  margin-bottom: 4rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled(Card)`
  h2 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.8;
  }
`;

const AboutImage = styled(Card)`
  position: relative;
  overflow: hidden;
  min-height: 400px;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const FeatureSection = styled.section`
  margin-bottom: 4rem;
`;

const FeatureTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  
  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
    font-size: 1.5rem;
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
  }
`;

const ContactSection = styled.section`
  margin-bottom: 4rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(Card)`
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
    color: ${props => props.theme.colors.text};
  }
  
  input, textarea {
    padding: 1rem;
    background: ${props => props.theme.colors.glass};
    border: 1px solid ${props => props.theme.colors.glassBorder};
    border-radius: ${props => props.theme.borderRadius.medium};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const TeamSection = styled.section`
  margin-bottom: 4rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled(Card)`
  text-align: center;
  
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1.5rem;
    border: 3px solid ${props => props.theme.colors.primary};
  }
  
  h3 {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.text};
  }
  
  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const About = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>About CuisineX</PageTitle>
        <PageDescription>
          Bringing the future of culinary arts to your kitchen through innovation and creativity
        </PageDescription>
      </PageHeader>
      
      <AboutGrid>
        <AboutContent variant="glass" elevation="low">
          <h2>Our Story</h2>
          <p>
            CuisineX was born from a simple idea: to revolutionize the way we experience food in our everyday lives. Founded in 2023, our team of passionate culinary innovators set out to create a platform that bridges the gap between cutting-edge gastronomy and home cooking.
          </p>
          <p>
            We believe that cooking is both a science and an art form—one that's constantly evolving. Our mission is to make futuristic cooking techniques accessible to everyone, demystifying molecular gastronomy and avant-garde culinary approaches.
          </p>
          <p>
            Each recipe on CuisineX is meticulously crafted, tested, and refined to ensure it not only delivers extraordinary flavors but also creates a sensory experience that challenges conventional dining. We're pushing the boundaries of what's possible in your kitchen.
          </p>
          <p>
            Join us on this culinary journey as we explore new horizons, experimenting with textures, flavors, and presentations that will transform your relationship with food.
          </p>
        </AboutContent>
        
        <AboutImage variant="dark" elevation="high">
          <img 
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="Modern kitchen with chefs working" 
          />
        </AboutImage>
      </AboutGrid>
      
      <FeatureSection>
        <FeatureTitle>Why Choose CuisineX</FeatureTitle>
        <FeatureGrid>
          <FeatureCard variant="glass" elevation="low">
            <h3>Innovative Recipes</h3>
            <p>
              Our recipes combine modern techniques with artistic presentation, creating dishes that are as visually stunning as they are delicious. Each recipe is designed to introduce you to new culinary frontiers.
            </p>
          </FeatureCard>
          
          <FeatureCard variant="glass" elevation="low">
            <h3>Interactive Cooking</h3>
            <p>
              We've reimagined recipe instructions with interactive step-by-step guides, allowing you to track your progress and learn new techniques with ease. Our approach makes complex methods more approachable.
            </p>
          </FeatureCard>
          
          <FeatureCard variant="glass" elevation="low">
            <h3>Community & Support</h3>
            <p>
              Join a community of forward-thinking home chefs and professionals who share your passion for culinary innovation. Exchange ideas, share your creations, and get inspired by others.
            </p>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>
      
      <TeamSection>
        <FeatureTitle>Meet Our Team</FeatureTitle>
        <TeamGrid>
          <TeamCard variant="glass" elevation="low">
            <img 
              src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
              alt="Chef Nova" 
            />
            <h3>Chef Nova</h3>
            <p>Executive Chef & Founder</p>
            <p>Specializes in molecular gastronomy and avant-garde techniques that challenge traditional cooking methods.</p>
          </TeamCard>
          
          <TeamCard variant="glass" elevation="low">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
              alt="Aria Wong" 
            />
            <h3>Aria Wong</h3>
            <p>Pastry Chef & Creative Director</p>
            <p>Creates desserts that push boundaries through innovative techniques and unconventional flavor combinations.</p>
          </TeamCard>
          
          <TeamCard variant="glass" elevation="low">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
              alt="Leo Zhang" 
            />
            <h3>Leo Zhang</h3>
            <p>Food Scientist & Recipe Developer</p>
            <p>Brings scientific precision to recipe development, ensuring each dish achieves the perfect balance of flavor and texture.</p>
          </TeamCard>
          
          <TeamCard variant="glass" elevation="low">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
              alt="Mira Patel" 
            />
            <h3>Mira Patel</h3>
            <p>Food Photographer & Stylist</p>
            <p>Captures the essence of each dish, creating visually stunning imagery that highlights the artistic nature of our recipes.</p>
          </TeamCard>
        </TeamGrid>
      </TeamSection>
      
      <ContactSection>
        <FeatureTitle>Get In Touch</FeatureTitle>
        <ContactGrid>
          <ContactForm variant="glass" elevation="low">
            <form>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your email address" />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Your message" />
              </FormGroup>
              
              <Button variant="gradient" size="large" fullWidth>
                Send Message <FiSend style={{ marginLeft: '8px' }} />
              </Button>
            </form>
          </ContactForm>
          
          <AboutImage variant="dark" elevation="high">
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Modern kitchen interior" 
            />
          </AboutImage>
        </ContactGrid>
      </ContactSection>
    </PageContainer>
  );
};

export default About; 