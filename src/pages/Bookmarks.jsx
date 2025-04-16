import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useBookmarkContext } from '../context/BookmarkContext';
import RecipeCard from '../components/recipe/RecipeCard';
import Button from '../components/common/Button';

const BookmarksContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 100px 16px 40px;
  }
`;

const BookmarksHeader = styled.div`
  margin-bottom: 3rem;
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

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  line-height: 1.6;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  margin: 3rem 0;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
`;

const EmptyStateText = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const ClearAllButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Bookmarks = () => {
  const { bookmarkedRecipes, removeBookmark } = useBookmarkContext();
  const navigate = useNavigate();
  
  const handleClearAll = () => {
    // This will trigger multiple removeBookmark calls
    // A more efficient approach would be to add a clearAll method to the context
    bookmarkedRecipes.forEach(recipe => removeBookmark(recipe.id));
  };
  
  return (
    <BookmarksContainer>
      <BookmarksHeader>
        <PageTitle>Your Saved Recipes</PageTitle>
        <Subtitle>
          All your favorite culinary creations in one place, ready for your next cooking adventure.
        </Subtitle>
      </BookmarksHeader>
      
      {bookmarkedRecipes.length > 0 && (
        <ActionBar>
          <ClearAllButton 
            variant="outline" 
            onClick={handleClearAll}
          >
            <FiTrash2 /> Clear All
          </ClearAllButton>
        </ActionBar>
      )}
      
      {bookmarkedRecipes.length > 0 ? (
        <RecipeGrid>
          {bookmarkedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeGrid>
      ) : (
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <EmptyStateTitle>No Bookmarks Yet</EmptyStateTitle>
          <EmptyStateText>
            Start adding recipes to your bookmarks by clicking the bookmark icon on any recipe page.
          </EmptyStateText>
          <Button 
            variant="gradient" 
            size="large" 
            rounded
            onClick={() => navigate('/')}
          >
            Explore Recipes
          </Button>
        </EmptyState>
      )}
    </BookmarksContainer>
  );
};

export default Bookmarks; 