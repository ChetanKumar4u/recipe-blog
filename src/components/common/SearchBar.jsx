import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn } from '../../styles/Animations';
import { useRecipeContext } from '../../context/RecipeContext';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: ${props => props.expanded ? '600px' : '300px'};
  transition: all ${props => props.theme.transitions.normal};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 48px 12px 20px;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.glassBorder};
  border-radius: ${props => props.theme.borderRadius.xlarge};
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.normal};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}40;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.6;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ClearButton = styled(motion.button)`
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.visible ? '1' : '0')};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ResultsContainer = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: ${props => props.theme.colors.cardBg};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.colors.shadow};
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.glassBorder};
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.glass};
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  }
`;

const ResultTitle = styled.div`
  font-weight: 500;
  margin-bottom: 4px;
`;

const ResultDescription = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchBar = ({ onSelectRecipe, placeholder = "Search for recipes, ingredients, or techniques..." }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { searchRecipes, filteredRecipes } = useRecipeContext();
  
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      searchRecipes(value);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };
  
  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    searchRecipes('');
  };
  
  const handleResultClick = (recipe) => {
    if (onSelectRecipe) {
      onSelectRecipe(recipe);
    }
    setShowResults(false);
    setQuery('');
  };
  
  return (
    <SearchContainer
      expanded={focused}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleQueryChange}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setTimeout(() => setFocused(false), 200);
        }}
      />
      
      <ClearButton 
        visible={query.length > 0}
        onClick={clearSearch}
        aria-label="Clear search"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: query.length > 0 ? 1 : 0, scale: query.length > 0 ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <FiX size={18} />
      </ClearButton>
      
      <IconWrapper>
        <FiSearch size={20} />
      </IconWrapper>
      
      {showResults && filteredRecipes.length > 0 && (
        <ResultsContainer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {filteredRecipes.slice(0, 5).map(recipe => (
            <ResultItem 
              key={recipe.id} 
              onClick={() => handleResultClick(recipe)}
            >
              <ResultTitle>{recipe.title}</ResultTitle>
              <ResultDescription>{recipe.description}</ResultDescription>
            </ResultItem>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
};

export default SearchBar; 