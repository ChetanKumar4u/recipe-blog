import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample bookmarked recipes data for testing
const sampleBookmarkedRecipes = [
  {
    id: 'r1',
    title: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    time: '30 min',
    difficulty: 'Easy',
    rating: 4.8,
    category: 'Italian',
    description: 'A simple yet delicious traditional Margherita pizza with fresh basil, mozzarella, and tomato sauce on a thin, crispy crust.',
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    tags: ['Italian', 'Pizza', 'Vegetarian'],
    author: {
      name: 'Sophia Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    }
  },
  {
    id: 'r2',
    title: 'Teriyaki Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    time: '25 min',
    difficulty: 'Medium',
    rating: 4.6,
    category: 'Japanese',
    description: 'A nutritious and flavorful teriyaki salmon bowl with steamed rice, avocado, cucumber, and a homemade teriyaki glaze.',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    tags: ['Japanese', 'Seafood', 'Healthy'],
    author: {
      name: 'Alex Wong',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 'r3',
    title: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    time: '40 min',
    difficulty: 'Medium',
    rating: 4.9,
    category: 'Dessert',
    description: 'Decadent chocolate lava cake with a gooey, molten center. Served warm with a scoop of vanilla ice cream for the perfect dessert.',
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    tags: ['Dessert', 'Chocolate', 'Baking'],
    author: {
      name: 'Emma Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    }
  }
];

const BookmarkContext = createContext();

export const useBookmarkContext = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  // Initialize with sample data for testing
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(sampleBookmarkedRecipes);
  
  // Load bookmarks from localStorage on init
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedRecipes');
    if (savedBookmarks) {
      setBookmarkedRecipes(JSON.parse(savedBookmarks));
    }
  }, []);
  
  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedRecipes', JSON.stringify(bookmarkedRecipes));
  }, [bookmarkedRecipes]);
  
  const addBookmark = (recipe) => {
    if (!isBookmarked(recipe.id)) {
      setBookmarkedRecipes(prev => [...prev, recipe]);
    }
  };
  
  const removeBookmark = (recipeId) => {
    setBookmarkedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };
  
  const toggleBookmark = (recipe) => {
    if (isBookmarked(recipe.id)) {
      removeBookmark(recipe.id);
    } else {
      addBookmark(recipe);
    }
  };
  
  const isBookmarked = (recipeId) => {
    return bookmarkedRecipes.some(recipe => recipe.id === recipeId);
  };
  
  const contextValue = {
    bookmarkedRecipes,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    bookmarkCount: bookmarkedRecipes.length
  };
  
  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContext; 