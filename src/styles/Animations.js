import { keyframes } from 'styled-components';

// Fade in animation
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Slide up animation
export const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Slide down animation
export const slideDown = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Slide in from right
export const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Slide in from left
export const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Scale up animation
export const scaleUp = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// Pulse animation
export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Glow animation for highlights
export const glow = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

// Shimmer animation for loading states
export const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Rotate animation
export const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Bounce animation
export const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Float animation for hover effects
export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Color shift animation for gradients
export const colorShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Typing animation for text
export const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Blink animation for cursor
export const blink = keyframes`
  50% { border-color: transparent }
`;

// Framer Motion variants
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.03, 
    y: -10,
    boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
    transition: { 
      type: "spring", 
      stiffness: 300 
    }
  }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2, 
      ease: "easeOut" 
    }
  },
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: "easeOut" 
    }
  }
};

export const imageZoom = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    }
  }
}; 