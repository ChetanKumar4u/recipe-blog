import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import Card from '../common/Card';

const IngredientListContainer = styled(Card)`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    background: ${props => props.theme.colors.secondary};
    bottom: -10px;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ListItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(5px);
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  transition: all ${props => props.theme.transitions.normal};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.secondary};
  }
  
  svg {
    color: ${props => props.checked ? props.theme.colors.success : props.theme.colors.textSecondary};
    margin-right: 0.75rem;
    min-width: 20px;
    transition: all ${props => props.theme.transitions.fast};
  }
  
  &:hover svg {
    color: ${props => props.checked ? props.theme.colors.success : props.theme.colors.primary};
  }
`;

const IngredientText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: ${props => props.checked ? props.theme.colors.textSecondary : props.theme.colors.text};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  transition: all ${props => props.theme.transitions.fast};
`;

const IngredientAmount = styled.span`
  font-weight: 600;
  display: block;
  font-family: ${props => props.theme.fonts.accent};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.accent};
  margin-top: 0.25rem;
`;

const StyledCard = styled(Card)`
  padding: 0;
`;

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const IngredientList = ({ ingredients }) => {
  const [checkedItems, setCheckedItems] = React.useState({});
  
  const toggleItem = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  return (
    <StyledCard variant="glass" elevation="low">
      <IngredientListContainer variant={null}>
        <Title>Ingredients</Title>
        <List
          as={motion.ul}
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {ingredients.map((ingredient, index) => (
            <ListItem
              key={index}
              variants={itemVariants}
              onClick={() => toggleItem(index)}
              checked={checkedItems[index]}
            >
              <FiCheckCircle size={20} />
              <IngredientText checked={checkedItems[index]}>
                {ingredient.name}
                <IngredientAmount>
                  {ingredient.amount} {ingredient.unit}
                </IngredientAmount>
              </IngredientText>
            </ListItem>
          ))}
        </List>
      </IngredientListContainer>
    </StyledCard>
  );
};

export default IngredientList; 