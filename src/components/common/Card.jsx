import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { float, glow } from '../../styles/Animations';

const CardContainer = styled(motion.div)`
  position: relative;
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || '100%'};

  /* Default style */
  ${props => !props.variant && css`
    background: ${props.theme.colors.cardBg};
    box-shadow: ${props.theme.colors.shadow};
  `}

  /* Glass morphism variant */
  ${props => props.variant === 'glass' && css`
    background: ${props.theme.colors.glass};
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid ${props.theme.colors.glassBorder};
    box-shadow: ${props.theme.colors.shadow};
  `}

  /* Gradient variant */
  ${props => props.variant === 'gradient' && css`
    background: ${props.theme.colors.gradientPrimary};
    box-shadow: ${props.theme.colors.shadow};
  `}

  /* Dark variant */
  ${props => props.variant === 'dark' && css`
    background: rgba(10, 10, 20, 0.95);
    box-shadow: ${props.theme.colors.shadow};
  `}

  /* Interactive hover effects */
  ${props => props.interactive && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
    }
  `}

  /* Floating animation */
  ${props => props.floating && css`
    animation: ${float} 6s ease-in-out infinite;
  `}

  /* Glowing border */
  ${props => props.glowing && css`
    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      z-index: -1;
      background: ${props.theme.colors.gradientPrimary};
      border-radius: ${props.theme.borderRadius.large};
      animation: ${glow} 3s ease-in-out infinite;
    }
  `}

  /* Elevation variants */
  ${props => props.elevation === 'low' && css`
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  `}

  ${props => props.elevation === 'high' && css`
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  `}
`;

const CardContent = styled.div`
  padding: ${props => props.padding || props.theme.spacing.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Card = ({
  children,
  variant,
  interactive = false,
  floating = false,
  glowing = false,
  elevation,
  padding,
  height,
  width,
  onClick,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <CardContainer
      variant={variant}
      interactive={interactive}
      floating={floating}
      glowing={glowing}
      elevation={elevation}
      height={height}
      width={width}
      onClick={onClick}
      initial={initial}
      animate={animate}
      transition={transition}
      {...props}
    >
      <CardContent padding={padding}>
        {children}
      </CardContent>
    </CardContainer>
  );
};

export default Card; 