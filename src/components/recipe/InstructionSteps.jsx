import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronRight } from 'react-icons/fi';
import Card from '../common/Card';

const StepsContainer = styled(Card)`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 3px;
    background: ${props => props.theme.colors.primary};
    bottom: -10px;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.small};
  }
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled(motion.div)`
  display: flex;
  position: relative;
  background: ${props => props.active || props.completed ? props.theme.colors.glass : 'transparent'};
  backdrop-filter: ${props => props.active || props.completed ? 'blur(5px)' : 'none'};
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  transition: all ${props => props.theme.transitions.normal};
  border: 1px solid ${props => 
    props.completed ? props.theme.colors.success + '80' : 
    props.active ? props.theme.colors.primary + '80' : 
    'transparent'
  };
  
  &:hover {
    background: ${props => props.theme.colors.glass};
    transform: ${props => props.active || props.completed ? 'scale(1.02)' : 'none'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => 
      props.completed ? props.theme.colors.success : 
      props.active ? props.theme.colors.primary : 
      props.theme.colors.textSecondary + '40'
    };
  }
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: ${props => 
    props.completed ? props.theme.colors.success : 
    props.active ? props.theme.colors.primary : 
    props.theme.colors.glass
  };
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  font-family: ${props => props.theme.fonts.accent};
  margin: 1rem;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all ${props => props.theme.transitions.normal};
`;

const StepContent = styled.div`
  flex: 1;
  padding: 1rem 1rem 1rem 0;
`;

const StepText = styled.p`
  color: ${props => 
    props.completed ? props.theme.colors.textSecondary : props.theme.colors.text
  };
  line-height: 1.6;
  transition: all ${props => props.theme.transitions.normal};
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => 
    props.completed ? props.theme.colors.success : 
    props.active ? props.theme.colors.primary : 
    props.theme.colors.textSecondary
  };
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => 
      props.completed ? props.theme.colors.success : props.theme.colors.primary
    };
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.round};
  margin: 1rem 0 2rem;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradientPrimary};
  border-radius: ${props => props.theme.borderRadius.round};
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
`;

const StepsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const InstructionSteps = ({ instructions }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(step => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
      if (index === activeStep && index < instructions.length - 1) {
        setActiveStep(index + 1);
      }
    }
  };
  
  const progress = Math.round((completedSteps.length / instructions.length) * 100);
  
  return (
    <StepsContainer variant="glass" elevation="low">
      <Title>Instructions</Title>
      
      <ProgressBar>
        <ProgressFill 
          progress={progress}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>
      
      <StepsList>
        <AnimatePresence>
          {instructions.map((instruction, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = activeStep === index;
            
            return (
              <StepItem 
                key={index}
                active={isActive}
                completed={isCompleted}
                onClick={() => !isCompleted && setActiveStep(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StepNumber completed={isCompleted} active={isActive}>
                  {isCompleted ? <FiCheck size={20} /> : index + 1}
                </StepNumber>
                
                <StepContent>
                  <StepText completed={isCompleted}>
                    {instruction}
                  </StepText>
                </StepContent>
                
                <ToggleButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStep(index);
                  }}
                  completed={isCompleted}
                  active={isActive}
                >
                  {isCompleted ? <FiCheck size={20} /> : <FiChevronRight size={20} />}
                </ToggleButton>
              </StepItem>
            );
          })}
        </AnimatePresence>
      </StepsList>
      
      <StepsFooter>
        <div>{completedSteps.length} of {instructions.length} steps completed</div>
      </StepsFooter>
    </StepsContainer>
  );
};

export default InstructionSteps; 