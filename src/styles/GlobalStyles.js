import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${props => props.theme.fonts.body};
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
    background-image: 
      radial-gradient(circle at 25% 15%, rgba(98, 0, 234, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 75% 85%, rgba(0, 191, 165, 0.1) 0%, transparent 40%);
    background-attachment: fixed;
    line-height: 1.5;
    overflow-x: hidden;
    transition: background-color ${props => props.theme.transitions.normal};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: ${props => props.theme.spacing.md};
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: 3rem;
    background: ${props => props.theme.colors.gradientPrimary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${props => props.theme.spacing.lg};
  }

  h2 {
    font-size: 2.2rem;
    margin-bottom: ${props => props.theme.spacing.md};
  }

  h3 {
    font-size: 1.8rem;
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  ul, ol {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.lg};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.body};
  }

  input, textarea, select {
    font-family: ${props => props.theme.fonts.body};
  }

  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent};
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(98, 0, 234, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(98, 0, 234, 0); }
    100% { box-shadow: 0 0 0 0 rgba(98, 0, 234, 0); }
  }

  /* Glass morphism utility classes */
  .glass {
    background: ${props => props.theme.colors.glass};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid ${props => props.theme.colors.glassBorder};
    box-shadow: ${props => props.theme.colors.shadow};
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

export default GlobalStyles; 