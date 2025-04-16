import React from 'react';
import styled, { css } from 'styled-components';
import { pulse } from '../../styles/Animations';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => 
    props.size === 'small' ? '8px 16px' : 
    props.size === 'large' ? '14px 28px' : 
    '10px 20px'};
  font-size: ${props => 
    props.size === 'small' ? '0.875rem' : 
    props.size === 'large' ? '1.125rem' : 
    '1rem'};
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: ${props => props.rounded ? '50px' : props.theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  position: relative;
  overflow: hidden;
  z-index: 1;
  gap: 8px;
  
  /* Default variant */
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  
  /* Glowing effect on hover */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(98, 0, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  /* Button variants */
  ${props => props.variant === 'secondary' && css`
    background: ${props.theme.colors.secondary};
    &:hover {
      box-shadow: 0 6px 20px rgba(0, 191, 165, 0.4);
    }
  `}
  
  ${props => props.variant === 'outline' && css`
    background: transparent;
    border: 2px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary}10;
      box-shadow: 0 4px 12px rgba(98, 0, 234, 0.2);
    }
  `}
  
  ${props => props.variant === 'ghost' && css`
    background: transparent;
    color: ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary}10;
      box-shadow: none;
    }
  `}
  
  ${props => props.variant === 'gradient' && css`
    background: ${props.theme.colors.gradientPrimary};
    background-size: 200% 100%;
    background-position: 0% 0%;
    
    &:hover {
      background-position: 100% 0%;
      box-shadow: 0 6px 20px rgba(98, 0, 234, 0.4);
    }
  `}
  
  ${props => props.variant === 'glass' && css`
    background: ${props.theme.colors.glass};
    backdrop-filter: blur(8px);
    border: 1px solid ${props.theme.colors.glassBorder};
    
    &:hover {
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
  `}
  
  /* Disabled state */
  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
  
  /* Loading state */
  ${props => props.loading && css`
    color: transparent;
    pointer-events: none;
    
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
      animation: ${props.theme.transitions.spin} 0.8s linear infinite;
    }
  `}
  
  /* Pulse animation for attention */
  ${props => props.pulse && css`
    animation: ${pulse} 2s infinite;
  `}
  
  /* Full width button */
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  pulse = false,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      rounded={rounded}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
      pulse={pulse}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 