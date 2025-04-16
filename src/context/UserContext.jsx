import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// Sample user data
const defaultUser = {
  id: 1,
  name: "Guest User",
  email: "guest@example.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  bio: "Food enthusiast exploring new culinary horizons.",
  preferences: {
    dietaryRestrictions: [],
    cuisinePreferences: ["Italian", "Japanese", "Mexican"],
    skillLevel: "Intermediate"
  },
  createdRecipes: [],
  activityFeed: [
    { type: 'like', date: '2023-11-25', recipeId: 1 },
    { type: 'comment', date: '2023-11-22', recipeId: 3 },
    { type: 'bookmark', date: '2023-11-20', recipeId: 2 }
  ]
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  // Simulate loading user data from localStorage on init
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    } else {
      // For demo purposes, auto-login with default user
      setUser(defaultUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);
  
  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };
  
  const updateProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };
  
  const toggleProfileModal = () => {
    setIsProfileModalOpen(prev => !prev);
  };
  
  const contextValue = {
    user,
    isLoggedIn,
    login,
    logout,
    updateProfile,
    isProfileModalOpen,
    toggleProfileModal
  };
  
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext; 