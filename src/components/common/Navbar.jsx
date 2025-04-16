import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BiMenu, BiX, BiSearch, BiUser, BiBookmark } from 'react-icons/bi';
import SearchBar from './SearchBar';
import { useRecipeContext } from '../../context/RecipeContext';
import { buttonHover } from '../../styles/Animations';

const NavbarContainer = styled(motion.nav)`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: ${props => props.theme.spacing.md} 0;
  backdrop-filter: blur(10px);
  background: ${props => props.isScrolled ? 'rgba(10, 10, 20, 0.85)' : 'transparent'};
  border-bottom: ${props => props.isScrolled ? `1px solid ${props.theme.colors.glassBorder}` : 'none'};
  transition: all 0.3s ease;
`;

const NavbarContent = styled.div`
  max-width: ${props => props.theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion(Link))`
  font-family: ${props => props.theme.fonts.logo};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    background: ${props => props.theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const LogoIcon = styled(motion.div)`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gradientPrimary};
  border-radius: ${props => props.theme.borderRadius.round};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.round};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 6px;
    height: 6px;
    background: ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.borderRadius.round};
  }
`;

const NavMenu = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  list-style: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const NavMenuItem = styled.li``;

const NavLink = styled(motion(Link))`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const NavActionButton = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const SearchToggle = styled(NavActionButton)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const ProfileButton = styled(NavActionButton)``;

const SavedButton = styled(NavActionButton)`
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileMenuToggle = styled(NavActionButton)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 270px;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(15px);
  padding: ${props => props.theme.spacing.lg};
  z-index: 110;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MobileMenuClose = styled(NavActionButton)`
  font-size: 1.8rem;
`;

const MobileMenuList = styled.ul`
  list-style: none;
  margin-top: ${props => props.theme.spacing.xl};
`;

const MobileMenuItem = styled(motion.li)`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MobileMenuLink = styled(Link)`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm} 0;
  display: block;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const SearchContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.theme.colors.glass};
  backdrop-filter: blur(15px);
  z-index: 110;
  padding: ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.glassBorder};
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SearchTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  font-weight: 500;
`;

const SearchContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 100;
`;

const NotificationBadge = styled(motion.span)`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  const { allRecipes } = useRecipeContext();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close menus when location changes
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <NavbarContainer 
        isScrolled={isScrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <NavbarContent>
          <Logo to="/" whileHover={{ scale: 1.05 }}>
            <LogoIcon
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <span>Future Flavors</span>
          </Logo>
          
          <NavMenu>
            <NavMenuItem>
              <NavLink 
                to="/" 
                active={isActive("/")}
                whileHover={{ scale: 1.05 }}
              >
                Home
              </NavLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavLink 
                to="/categories" 
                active={isActive("/categories") || location.pathname.includes("/categories/")}
                whileHover={{ scale: 1.05 }}
              >
                Categories
              </NavLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavLink 
                to="/community" 
                active={isActive("/community") || location.pathname.includes("/community/")}
                whileHover={{ scale: 1.05 }}
              >
                Community
              </NavLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavLink 
                to="/messages" 
                active={isActive("/messages") || location.pathname.includes("/messages/")}
                whileHover={{ scale: 1.05 }}
              >
                Messages
              </NavLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavLink 
                to="/about" 
                active={isActive("/about")}
                whileHover={{ scale: 1.05 }}
              >
                About
              </NavLink>
            </NavMenuItem>
          </NavMenu>
          
          <NavActions>
            <SearchToggle 
              onClick={() => setIsSearchOpen(true)}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <BiSearch />
            </SearchToggle>
            
            <SavedButton 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <BiBookmark />
              <NotificationBadge
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                3
              </NotificationBadge>
            </SavedButton>
            
            <ProfileButton 
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <BiUser />
            </ProfileButton>
            
            <MobileMenuToggle 
              onClick={() => setIsMobileMenuOpen(true)}
              variants={buttonHover}
              whileHover="hover"
              whileTap="tap"
              initial="rest"
            >
              <BiMenu />
            </MobileMenuToggle>
          </NavActions>
        </NavbarContent>
      </NavbarContainer>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Backdrop 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <MobileMenuHeader>
                <Logo to="/">
                  <span>Future Flavors</span>
                </Logo>
                <MobileMenuClose onClick={() => setIsMobileMenuOpen(false)}>
                  <BiX />
                </MobileMenuClose>
              </MobileMenuHeader>
              
              <MobileMenuList>
                {["Home", "Categories", "Community", "Messages", "About"].map((item, i) => (
                  <MobileMenuItem
                    key={item}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <MobileMenuLink 
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      active={isActive(item === "Home" ? "/" : `/${item.toLowerCase()}`)}
                    >
                      {item}
                    </MobileMenuLink>
                  </MobileMenuItem>
                ))}
              </MobileMenuList>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <Backdrop 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
            />
            <SearchContainer
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
            >
              <SearchHeader>
                <SearchTitle>Search Recipes</SearchTitle>
                <MobileMenuClose onClick={() => setIsSearchOpen(false)}>
                  <BiX />
                </MobileMenuClose>
              </SearchHeader>
              
              <SearchContent>
                <SearchBar />
              </SearchContent>
            </SearchContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 