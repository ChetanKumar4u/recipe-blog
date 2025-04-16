import React, { createContext, useState, useContext } from 'react';
import recipes from '../data/recipes';
import categories from '../data/categories';

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [allRecipes, setAllRecipes] = useState(recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getFeaturedRecipes = () => {
    return allRecipes.filter(recipe => recipe.featured);
  };

  const getRecipeById = (id) => {
    return allRecipes.find(recipe => recipe.id === parseInt(id));
  };

  const getRecipesByCategory = (categorySlug) => {
    if (!categorySlug) {
      setFilteredRecipes(allRecipes);
      setActiveCategory(null);
      return allRecipes;
    }

    const category = categories.find(cat => cat.slug === categorySlug);
    setActiveCategory(category);

    // Match category name to recipe tags
    const filtered = allRecipes.filter(recipe => 
      recipe.tags.some(tag => tag.toLowerCase() === category.name.toLowerCase() || 
                            tag.toLowerCase() === categorySlug.toLowerCase())
    );
    
    setFilteredRecipes(filtered);
    return filtered;
  };

  const searchRecipes = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredRecipes(activeCategory ? getRecipesByCategory(activeCategory.slug) : allRecipes);
      return;
    }

    const searchTermLower = term.toLowerCase();
    const results = allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTermLower) ||
      recipe.description.toLowerCase().includes(searchTermLower) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTermLower)) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTermLower))
    );

    setFilteredRecipes(results);
    return results;
  };

  const getSimilarRecipes = (recipe, limit = 3) => {
    if (!recipe) return [];

    // Get recipes with similar tags
    const similar = allRecipes
      .filter(r => r.id !== recipe.id) // Exclude current recipe
      .map(r => {
        // Calculate similarity score based on matching tags
        const matchingTags = r.tags.filter(tag => recipe.tags.includes(tag));
        return { 
          ...r, 
          similarityScore: matchingTags.length 
        };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);

    return similar;
  };

  const contextValue = {
    allRecipes,
    filteredRecipes,
    activeCategory,
    searchTerm,
    categories,
    selectedRecipe,
    setSelectedRecipe,
    getFeaturedRecipes,
    getRecipeById,
    getRecipesByCategory,
    searchRecipes,
    getSimilarRecipes
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContext; 