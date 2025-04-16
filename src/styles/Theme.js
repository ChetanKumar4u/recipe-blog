const theme = {
  colors: {
    primary: '#6200EA',       // Deep purple
    secondary: '#00BFA5',     // Teal
    accent: '#2979FF',        // Electric blue
    background: '#121212',    // Near-black
    cardBg: 'rgba(24, 24, 36, 0.8)', // Semi-transparent dark
    text: '#FFFFFF',          // White
    textSecondary: '#E0E0E0', // Light gray
    success: '#00E676',       // Green
    error: '#FF1744',         // Red
    warning: '#FFAB00',       // Amber
    info: '#00B0FF',          // Light blue
    gradientPrimary: 'linear-gradient(45deg, #6200EA 0%, #B388FF 100%)',
    gradientSecondary: 'linear-gradient(45deg, #00BFA5 0%, #64FFDA 100%)',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    accent: '"Orbitron", sans-serif',
    logo: '"Orbitron", sans-serif',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    xlarge: '24px',
    round: '50%',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  zIndex: {
    base: 1,
    menu: 10,
    modal: 100,
    toast: 1000,
  },
  layout: {
    maxWidth: '1400px',
    contentWidth: '1200px',
    sidebarWidth: '280px',
  }
};

export default theme; 