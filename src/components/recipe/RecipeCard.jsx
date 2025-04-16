import React from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiTime, BiDish } from 'react-icons/bi';
import Card from '../common/Card';
import { slideInRight, fadeIn, cardHover, imageZoom } from '../../styles/Animations';

const RecipeImage = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.large} ${props => props.theme.borderRadius.large} 0 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;
  }
`;

const RecipeContent = styled.div`
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const RecipeTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;

const RecipeDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: ${props => props.theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const RecipeMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.glassBorder};
`;

const RecipeMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.85rem;
  
  svg {
    color: ${props => props.theme.colors.accent};
  }
`;

const RecipeDifficulty = styled(motion.span)`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(5px);
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.xlarge};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.colors.glassBorder};
  z-index: 2;
`;

const TagContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tag = styled(motion.span)`
  background: ${props => props.theme.colors.glass};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: ${props => props.theme.borderRadius.round};
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.theme.colors.glassBorder};
`;

const RecipeCardContainer = styled(motion.div)`
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  height: 100%;
  perspective: 1000px;
`;

const ShineEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 10;
  opacity: 0;
  pointer-events: none;
`;

const RecipeCard = ({ recipe, featured = false }) => {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Create a subtle 3D rotation effect on mouse move
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <RecipeCardContainer
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, z: 100 }}
      whileHover="hover"
      initial="rest"
      variants={cardHover}
    >
      <Card
        variant="glass"
        elevation="high"
        height="100%"
        initial={null}
        animate={null}
        style={{ padding: 0 }}
      >
        <ShineEffect
          animate={{
            opacity: [0, 0.4, 0],
            x: ['-100%', '100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 5,
          }}
        />
        
        <RecipeImage>
          <motion.img 
            src={recipe.image} 
            alt={recipe.title} 
            variants={imageZoom}
          />
          {recipe.difficulty && (
            <RecipeDifficulty
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {recipe.difficulty}
            </RecipeDifficulty>
          )}
        </RecipeImage>
        
        <RecipeContent>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          
          <TagContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Tag 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {tag}
              </Tag>
            ))}
          </TagContainer>
          
          <RecipeDescription>{recipe.description}</RecipeDescription>
          
          <RecipeMeta>
            <RecipeMetaItem>
              <BiTime />
              {recipe.prepTime + recipe.cookTime} min
            </RecipeMetaItem>
            
            <RecipeMetaItem>
              <BiDish />
              {recipe.servings} servings
            </RecipeMetaItem>
          </RecipeMeta>
        </RecipeContent>
      </Card>
    </RecipeCardContainer>
  );
};

export default RecipeCard; 