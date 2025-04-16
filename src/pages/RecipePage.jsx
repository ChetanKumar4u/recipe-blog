import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeDetail from '../components/recipe/RecipeDetail';
import RecipeCard from '../components/recipe/RecipeCard';
import Button from '../components/common/Button';
import { FiArrowLeft } from 'react-icons/fi';

const PageContainer = styled.div`
  min-height: 100vh;
`;

const BackButton = styled(Button)`
  position: fixed;
  top: 100px;
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    position: absolute;
    top: 80px;
  }
`;

const SimilarRecipesSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, getSimilarRecipes, setSelectedRecipe, selectedRecipe } = useRecipeContext();
  
  useEffect(() => {
    const recipe = getRecipeById(id);
    
    if (recipe) {
      setSelectedRecipe(recipe);
      // Scroll to top when recipe changes
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  }, [id, getRecipeById, setSelectedRecipe, navigate]);
  
  if (!selectedRecipe) return null;
  
  const similarRecipes = getSimilarRecipes(selectedRecipe);
  
  return (
    <PageContainer>
      <BackButton 
        variant="glass" 
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft /> Back
      </BackButton>
      
      <RecipeDetail recipe={selectedRecipe} />
      
      {similarRecipes.length > 0 && (
        <SimilarRecipesSection>
          <SectionTitle>Similar Recipes</SectionTitle>
          <RecipeGrid>
            {similarRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </RecipeGrid>
        </SimilarRecipesSection>
      )}
    </PageContainer>
  );
};

export default RecipePage; 