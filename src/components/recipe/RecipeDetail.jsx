import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BiTime, BiDish, BiStar, BiSolidStar } from 'react-icons/bi';
import { FiClock, FiUser, FiBarChart, FiCalendar } from 'react-icons/fi';
import Card from '../common/Card';
import Button from '../common/Button';
import IngredientList from './IngredientList';
import InstructionSteps from './InstructionSteps';

const RecipeContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 40px;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 100px 16px 40px;
  }
`;

const RecipeHero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const RecipeImageWrapper = styled(Card)`
  position: relative;
  overflow: hidden;
  height: 400px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.large};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    height: 300px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at bottom right, 
      rgba(0, 0, 0, 0.1) 0%, 
      rgba(0, 0, 0, 0.5) 100%);
    z-index: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease-in-out;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const RecipeOverview = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.heading};
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const RecipeDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MetaInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetaInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.glass};
  border: 1px solid ${props => props.theme.colors.glassBorder};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
`;

const MetaInfoLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
`;

const MetaInfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.glass};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.9rem;
  padding: 0.3rem 1rem;
  border-radius: ${props => props.theme.borderRadius.round};
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.theme.colors.glassBorder};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(98, 0, 234, 0.2);
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 2px solid ${props => props.theme.colors.primary};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const RecipeDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const NutritionCard = styled(Card)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const NutritionTitle = styled.h3`
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
    background: ${props => props.theme.colors.accent};
    bottom: -10px;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const NutritionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const NutritionValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 0.5rem;
`;

const NutritionLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

// Review section styled components
const ReviewSectionContainer = styled(Card)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const ReviewSectionTitle = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    bottom: -10px;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ReviewItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const ReviewAvatar = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${props => props.theme.colors.primary};
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReviewContent = styled.div`
  flex-grow: 1;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ReviewerName = styled.h4`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ReviewInfo = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ReviewDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.warning};
  font-size: 1rem;
`;

const ReviewText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-top: 0.5rem;
`;

const SummaryBox = styled.div`
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.glassBorder};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const AverageRating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-right: 1.5rem;
  border-right: 1px solid ${props => props.theme.colors.glassBorder};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-right: 0;
    padding-bottom: 1.5rem;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
  }
`;

const RatingScore = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  background: ${props => props.theme.colors.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const RatingCount = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const RatingBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const RatingNumber = styled.div`
  width: 15px;
  text-align: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
`;

const RatingBarOuter = styled.div`
  flex-grow: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const RatingBarInner = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  width: ${props => props.percentage}%;
  border-radius: 4px;
`;

const RatingBarCount = styled.div`
  width: 40px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ToggleButton = styled(Button)`
  align-self: center;
  margin-top: 1rem;
`;

// Review section component
const ReviewSection = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Show just 3 reviews initially
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  
  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);
  
  // Calculate rating counts
  const ratingCounts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
  reviews.forEach(review => {
    ratingCounts[5 - review.rating]++;
  });
  
  return (
    <ReviewSectionContainer variant="glass" elevation="low">
      <ReviewSectionTitle>Customer Reviews</ReviewSectionTitle>
      
      <SummaryBox>
        <AverageRating>
          <RatingScore>{averageRating}</RatingScore>
          <RatingStars>
            {[1, 2, 3, 4, 5].map(star => (
              <BiSolidStar 
                key={star} 
                size={20} 
                color={star <= Math.round(averageRating) ? '#FFAB00' : 'rgba(255, 255, 255, 0.2)'}
              />
            ))}
          </RatingStars>
          <RatingCount>{reviews.length} reviews</RatingCount>
        </AverageRating>
        
        <RatingBreakdown>
          {[5, 4, 3, 2, 1].map(stars => (
            <RatingBar key={stars}>
              <RatingNumber>{stars}</RatingNumber>
              <RatingBarOuter>
                <RatingBarInner 
                  percentage={(ratingCounts[5 - stars] / reviews.length) * 100} 
                />
              </RatingBarOuter>
              <RatingBarCount>{ratingCounts[5 - stars]}</RatingBarCount>
            </RatingBar>
          ))}
        </RatingBreakdown>
      </SummaryBox>
      
      <ReviewsList>
        {displayedReviews.map((review) => (
          <ReviewItem 
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewAvatar>
              <img src={review.user.avatar} alt={review.user.name} />
            </ReviewAvatar>
            
            <ReviewContent>
              <ReviewHeader>
                <ReviewerName>{review.user.name}</ReviewerName>
                <ReviewInfo>
                  <ReviewDate>
                    <FiCalendar size={14} />
                    {review.date}
                  </ReviewDate>
                  <ReviewRating>
                    {[...Array(5)].map((_, i) => (
                      i < review.rating ? 
                        <BiSolidStar key={i} /> : 
                        <BiStar key={i} color="rgba(255, 255, 255, 0.2)" />
                    ))}
                  </ReviewRating>
                </ReviewInfo>
              </ReviewHeader>
              
              <ReviewText>{review.comment}</ReviewText>
            </ReviewContent>
          </ReviewItem>
        ))}
      </ReviewsList>
      
      {reviews.length > 3 && (
        <ToggleButton 
          variant="outline" 
          rounded 
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : `View All ${reviews.length} Reviews`}
        </ToggleButton>
      )}
    </ReviewSectionContainer>
  );
};

const RecipeDetail = ({ recipe }) => {
  if (!recipe) return null;
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <RecipeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <RecipeHero>
        <RecipeImageWrapper variant="dark" elevation="high">
          <img src={recipe.image} alt={recipe.title} />
        </RecipeImageWrapper>
        
        <RecipeOverview variant="glass" elevation="low">
          <RecipeTitle>{recipe.title}</RecipeTitle>
          
          <RecipeDescription>{recipe.description}</RecipeDescription>
          
          <MetaInfoContainer>
            <MetaInfoItem>
              <FiClock size={24} />
              <MetaInfoLabel>Prep Time</MetaInfoLabel>
              <MetaInfoValue>{recipe.prepTime} min</MetaInfoValue>
            </MetaInfoItem>
            
            <MetaInfoItem>
              <BiTime size={24} />
              <MetaInfoLabel>Cook Time</MetaInfoLabel>
              <MetaInfoValue>{recipe.cookTime} min</MetaInfoValue>
            </MetaInfoItem>
            
            <MetaInfoItem>
              <BiDish size={24} />
              <MetaInfoLabel>Servings</MetaInfoLabel>
              <MetaInfoValue>{recipe.servings}</MetaInfoValue>
            </MetaInfoItem>
            
            <MetaInfoItem>
              <FiBarChart size={24} />
              <MetaInfoLabel>Difficulty</MetaInfoLabel>
              <MetaInfoValue>{recipe.difficulty}</MetaInfoValue>
            </MetaInfoItem>
          </MetaInfoContainer>
          
          <TagsContainer>
            {recipe.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
          
          <AuthorSection>
            <AuthorAvatar src={recipe.author.avatar} alt={recipe.author.name} />
            <AuthorInfo>
              <div>Recipe by</div>
              <AuthorName>{recipe.author.name}</AuthorName>
            </AuthorInfo>
          </AuthorSection>
          
          <ButtonsContainer>
            <Button variant="gradient" rounded>Print Recipe</Button>
            <Button variant="outline" rounded>Save Recipe</Button>
            <Button variant="glass" rounded>Share</Button>
          </ButtonsContainer>
        </RecipeOverview>
      </RecipeHero>
      
      <RecipeDetailsWrapper>
        <IngredientList ingredients={recipe.ingredients} />
        <InstructionSteps instructions={recipe.instructions} />
      </RecipeDetailsWrapper>
      
      {recipe.nutrition && (
        <NutritionCard variant="glass" elevation="low">
          <NutritionTitle>Nutrition Information</NutritionTitle>
          <NutritionGrid>
            <NutritionItem>
              <NutritionValue>{recipe.nutrition.calories}</NutritionValue>
              <NutritionLabel>Calories</NutritionLabel>
            </NutritionItem>
            
            <NutritionItem>
              <NutritionValue>{recipe.nutrition.protein}g</NutritionValue>
              <NutritionLabel>Protein</NutritionLabel>
            </NutritionItem>
            
            <NutritionItem>
              <NutritionValue>{recipe.nutrition.carbs}g</NutritionValue>
              <NutritionLabel>Carbs</NutritionLabel>
            </NutritionItem>
            
            <NutritionItem>
              <NutritionValue>{recipe.nutrition.fat}g</NutritionValue>
              <NutritionLabel>Fat</NutritionLabel>
            </NutritionItem>
          </NutritionGrid>
        </NutritionCard>
      )}
      
      {recipe.reviews && recipe.reviews.length > 0 && (
        <ReviewSection reviews={recipe.reviews} />
      )}
    </RecipeContainer>
  );
};

export default RecipeDetail; 