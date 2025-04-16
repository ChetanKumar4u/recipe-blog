import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/recipe/RecipeCard';
import SearchBar from '../components/common/SearchBar';
import { FiFilter, FiX } from 'react-icons/fi';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  min-height: 100vh;
  
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
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.glassBorder};
  color: ${props => props.theme.colors.text};
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    overflow-x: auto;
    padding-bottom: 1rem;
    &::-webkit-scrollbar {
      height: 6px;
    }
  }
`;

const CategoryTab = styled.button`
  background: ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.glass};
  color: ${props => props.active 
    ? props.theme.colors.text 
    : props.theme.colors.textSecondary};
  border: 1px solid ${props => props.active 
    ? props.theme.colors.primary 
    : props.theme.colors.glassBorder};
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.xlarge};
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all ${props => props.theme.transitions.normal};
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active 
      ? props.theme.colors.primary 
      : props.theme.colors.primary}20;
    transform: translateY(-2px);
  }
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

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: ${props => props.theme.colors.textSecondary};
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const FilterPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: ${props => props.theme.colors.background}F5;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  padding: 2rem;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.5rem;
  font-family: ${props => props.theme.fonts.heading};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.theme.colors.glassBorder};
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition: all ${props => props.theme.transitions.fast};
    
    &:checked {
      background: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
      
      &::after {
        content: '✓';
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      }
    }
    
    &:hover {
      border-color: ${props => props.theme.colors.primary};
    }
  }
  
  label {
    cursor: pointer;
    color: ${props => props.theme.colors.textSecondary};
    transition: color ${props => props.theme.transitions.fast};
    
    &:hover {
      color: ${props => props.theme.colors.text};
    }
  }
`;

const Categories = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { 
    categories, 
    filteredRecipes, 
    getRecipesByCategory, 
    searchRecipes, 
    activeCategory,
    allRecipes
  } = useRecipeContext();
  
  const [showFilters, setShowFilters] = useState(false);
  const [difficulty, setDifficulty] = useState([]);
  const [prepTime, setPrepTime] = useState(null);
  
  useEffect(() => {
    getRecipesByCategory(slug);
  }, [slug, getRecipesByCategory]);
  
  const handleCategoryClick = (categorySlug) => {
    navigate(categorySlug ? `/categories/${categorySlug}` : '/categories');
  };
  
  const handleRecipeSearch = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleSearchChange = (e) => {
    searchRecipes(e.target.value);
  };
  
  const toggleDifficulty = (value) => {
    if (difficulty.includes(value)) {
      setDifficulty(difficulty.filter(d => d !== value));
    } else {
      setDifficulty([...difficulty, value]);
    }
  };
  
  const handlePrepTimeChange = (value) => {
    setPrepTime(value === prepTime ? null : value);
  };
  
  // Apply filters
  const filteredByOptions = filteredRecipes.filter(recipe => {
    let meetsConditions = true;
    
    if (difficulty.length > 0) {
      meetsConditions = meetsConditions && difficulty.includes(recipe.difficulty);
    }
    
    if (prepTime) {
      switch (prepTime) {
        case 'quick':
          meetsConditions = meetsConditions && recipe.prepTime <= 15;
          break;
        case 'medium':
          meetsConditions = meetsConditions && recipe.prepTime > 15 && recipe.prepTime <= 30;
          break;
        case 'long':
          meetsConditions = meetsConditions && recipe.prepTime > 30;
          break;
        default:
          break;
      }
    }
    
    return meetsConditions;
  });
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          {activeCategory ? activeCategory.name : 'All Recipes'}
        </PageTitle>
        <PageDescription>
          {activeCategory 
            ? activeCategory.description 
            : 'Explore our collection of innovative recipes that push the boundaries of culinary art.'}
        </PageDescription>
      </PageHeader>
      
      <FiltersContainer>
        <SearchContainer>
          <SearchBar 
            onSelectRecipe={handleRecipeSearch} 
            placeholder="Search within recipes..." 
          />
        </SearchContainer>
        
        <FilterButton onClick={() => setShowFilters(true)}>
          <FiFilter />
          Filters
        </FilterButton>
      </FiltersContainer>
      
      <CategoryTabs>
        <CategoryTab 
          active={!activeCategory} 
          onClick={() => handleCategoryClick('')}
        >
          All Recipes
        </CategoryTab>
        
        {categories.map(category => (
          <CategoryTab 
            key={category.id}
            active={activeCategory?.id === category.id}
            onClick={() => handleCategoryClick(category.slug)}
          >
            {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      {filteredByOptions.length > 0 ? (
        <RecipeGrid>
          <AnimatePresence>
            {filteredByOptions.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </AnimatePresence>
        </RecipeGrid>
      ) : (
        <NoResults>
          <h3>No recipes found</h3>
          <p>Try adjusting your search criteria or explore a different category.</p>
        </NoResults>
      )}
      
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <FilterHeader>
              <FilterTitle>Filter Recipes</FilterTitle>
              <CloseButton onClick={() => setShowFilters(false)}>
                <FiX />
              </CloseButton>
            </FilterHeader>
            
            <FilterSection>
              <h4>Difficulty</h4>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="easy" 
                  checked={difficulty.includes('Easy')}
                  onChange={() => toggleDifficulty('Easy')}
                />
                <label htmlFor="easy">Easy</label>
              </FilterOption>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="intermediate" 
                  checked={difficulty.includes('Intermediate')}
                  onChange={() => toggleDifficulty('Intermediate')}
                />
                <label htmlFor="intermediate">Intermediate</label>
              </FilterOption>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="advanced" 
                  checked={difficulty.includes('Advanced')}
                  onChange={() => toggleDifficulty('Advanced')}
                />
                <label htmlFor="advanced">Advanced</label>
              </FilterOption>
            </FilterSection>
            
            <FilterSection>
              <h4>Prep Time</h4>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="quick" 
                  checked={prepTime === 'quick'}
                  onChange={() => handlePrepTimeChange('quick')}
                />
                <label htmlFor="quick">Quick (Under 15 min)</label>
              </FilterOption>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="medium" 
                  checked={prepTime === 'medium'}
                  onChange={() => handlePrepTimeChange('medium')}
                />
                <label htmlFor="medium">Medium (15-30 min)</label>
              </FilterOption>
              <FilterOption>
                <input 
                  type="checkbox" 
                  id="long" 
                  checked={prepTime === 'long'}
                  onChange={() => handlePrepTimeChange('long')}
                />
                <label htmlFor="long">Long (Over 30 min)</label>
              </FilterOption>
            </FilterSection>
          </FilterPanel>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Categories;