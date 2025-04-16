import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/recipe/RecipeCard';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), 
              url('https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 180px 20px 80px;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
`;

const BrandName = styled(motion.div)`
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  letter-spacing: 1px;
  color: white;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const MainLogo = styled(motion.div)`
  font-family: 'Playfair Display', serif;
  font-size: 6.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -1px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 4rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 3rem;
  }
`;

const TagLines = styled(motion.div)`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  
  span {
    margin: 0 10px;
    position: relative;
    
    &:not(:last-child)::after {
      content: '•';
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1rem;
    flex-direction: column;
    gap: 0.5rem;
    
    span::after {
      display: none;
    }
  }
`;

const SearchContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 1.5rem;
  position: relative;
`;

const StyledSearchBar = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const ExploreButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const FeaturedSection = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 600px;
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

const CategorySection = styled.section`
  padding: 4rem 0;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  height: 200px;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${props => props.theme.colors.shadow};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, ${props => props.color || props.theme.colors.primary}CC);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const CategoryName = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  z-index: 2;
  margin: 0;
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

const Home = () => {
  const { getFeaturedRecipes, categories } = useRecipeContext();
  const navigate = useNavigate();
  const featuredRecipes = getFeaturedRecipes();
  
  const handleRecipeSearch = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  const handleCategoryClick = (slug) => {
    navigate(`/categories/${slug}`);
  };
  
  return (
    <>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <BrandName
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Future Flavors Network
          </BrandName>
          <MainLogo
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Future Flavors
          </MainLogo>
          <TagLines
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span>CULINARY INNOVATION</span>
            <span>RECIPE COLLECTION</span>
            <span>FOOD COMMUNITY</span>
          </TagLines>
          <SearchContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <StyledSearchBar>
              <SearchIcon>
                <FiSearch />
              </SearchIcon>
              <SearchInput 
                placeholder="Search for recipes, ingredients..." 
                type="text"
              />
            </StyledSearchBar>
          </SearchContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ExploreButton 
              onClick={() => navigate('/categories')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Recipes
            </ExploreButton>
          </motion.div>
        </HeroContent>
      </HeroSection>
      
      <HomeContainer>
        <FeaturedSection>
          <SectionTitle>Featured Recipes</SectionTitle>
          <SectionSubtitle>
            Cutting-edge culinary creations that combine science, art, and extraordinary flavors
          </SectionSubtitle>
          
          <RecipeGrid>
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </RecipeGrid>
          
          <ButtonContainer>
            <ViewMoreButton 
              variant="outline" 
              size="large" 
              onClick={() => navigate('/categories')}
            >
              View All Recipes <FiArrowRight />
            </ViewMoreButton>
          </ButtonContainer>
        </FeaturedSection>
        
        <CategorySection>
          <SectionTitle>Explore Categories</SectionTitle>
          <SectionSubtitle>
            Dive into our curated collections of innovative recipes across different culinary domains
          </SectionSubtitle>
          
          <CategoryGrid>
            {categories.slice(0, 8).map(category => (
              <CategoryCard 
                key={category.id}
                color={category.color}
                onClick={() => handleCategoryClick(category.slug)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img src={category.image} alt={category.name} />
                <CategoryName>{category.name}</CategoryName>
              </CategoryCard>
            ))}
          </CategoryGrid>
          
          <ButtonContainer>
            <ViewMoreButton 
              variant="outline" 
              size="large" 
              onClick={() => navigate('/categories')}
            >
              Explore All Categories <FiArrowRight />
            </ViewMoreButton>
          </ButtonContainer>
        </CategorySection>
      </HomeContainer>
    </>
  );
};

export default Home; 