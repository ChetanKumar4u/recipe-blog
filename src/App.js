import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import { RecipeProvider } from './context/RecipeContext';
import { UserProvider } from './context/UserContext';
import { MessagingProvider } from './context/MessagingContext';
import { BookmarkProvider } from './context/BookmarkContext';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CustomHead from './components/common/CustomHead';

// Pages
import Home from './pages/Home';
import Categories from './pages/Categories';
import RecipePage from './pages/RecipePage';
import About from './pages/About';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Messages from './pages/Messages';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Styled components for animations
const AppWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
`;

const AnimatedBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BackgroundGradient = styled(motion.div)`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    ${props => props.theme.colors.background} 0%,
    ${props => props.theme.colors.background} 70%
  );
  opacity: 0.8;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  background: ${props => props.color || props.theme.colors.primary};
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CustomHead />
      <RecipeProvider>
        <UserProvider>
          <MessagingProvider>
            <BookmarkProvider>
              <AppWrapper>
                <AnimatedBackground>
                  <BackgroundGradient
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 20%, rgba(10, 10, 30, 0.8) 0%, rgba(10, 10, 20, 1) 70%)',
                        'radial-gradient(circle at 80% 80%, rgba(10, 10, 30, 0.8) 0%, rgba(10, 10, 20, 1) 70%)',
                        'radial-gradient(circle at 80% 20%, rgba(10, 10, 30, 0.8) 0%, rgba(10, 10, 20, 1) 70%)',
                        'radial-gradient(circle at 20% 80%, rgba(10, 10, 30, 0.8) 0%, rgba(10, 10, 20, 1) 70%)',
                        'radial-gradient(circle at 20% 20%, rgba(10, 10, 30, 0.8) 0%, rgba(10, 10, 20, 1) 70%)',
                      ],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Floating orbs in the background */}
                  <FloatingOrb
                    color={theme.colors.primary}
                    style={{ width: '500px', height: '500px', top: '10%', left: '15%' }}
                    animate={{
                      x: [0, 40, -40, 0],
                      y: [0, 60, 30, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <FloatingOrb
                    color={theme.colors.accent}
                    style={{ width: '400px', height: '400px', bottom: '10%', right: '15%' }}
                    animate={{
                      x: [0, -50, 50, 0],
                      y: [0, -30, -60, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <FloatingOrb
                    color={theme.colors.secondary}
                    style={{ width: '300px', height: '300px', top: '40%', right: '30%' }}
                    animate={{
                      x: [0, 60, -30, 0],
                      y: [0, -40, 40, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  />
                </AnimatedBackground>
                
                <Router>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Navbar />
                  </motion.div>
                  
                  <ContentWrapper
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/categories/:slug" element={<Categories />} />
                        <Route path="/recipe/:id" element={<RecipePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/bookmarks" element={<Bookmarks />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/messages/:userId" element={<Messages />} />
                        <Route path="/community/profile/:userId" element={<Profile />} />
                      </Routes>
                    </AnimatePresence>
                  </ContentWrapper>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Footer />
                  </motion.div>
                </Router>
              </AppWrapper>
            </BookmarkProvider>
          </MessagingProvider>
        </UserProvider>
      </RecipeProvider>
    </ThemeProvider>
  );
}

export default App;
