import React, { createContext, useState, useContext, useEffect } from 'react';

const BookmarkContext = createContext();

export const useBookmarkContext = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  
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