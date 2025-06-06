import styled from 'styled-components';
import { theme } from '../styles/theme';

export const Button = styled.button`
  padding: ${props => props.size === 'large' ? '16px 24px' : '12px 20px'};
  background: ${props => {
    if (props.variant === 'secondary') return theme.colors.secondary;
    if (props.variant === 'outline') return 'transparent';
    if (props.variant === 'danger') return theme.colors.error;
    return theme.colors.primary;
  }};
  color: ${props => props.variant === 'outline' ? theme.colors.primary : 'white'};
  border: ${props => props.variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'};
  border-radius: ${theme.borderRadius.md};
  font-size: ${props => props.size === 'large' ? '18px' : '16px'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => {
      if (props.variant === 'secondary') return '#1976D2';
      if (props.variant === 'outline') return theme.colors.primary;
      if (props.variant === 'danger') return '#d32f2f';
      return theme.colors.primaryDark;
    }};
    color: ${props => props.variant === 'outline' ? 'white' : 'white'};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    background: ${theme.colors.gray[400]};
    color: ${theme.colors.gray[600]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${props => props.size === 'large' ? '14px 20px' : '10px 16px'};
    font-size: ${props => props.size === 'large' ? '16px' : '14px'};
  }
`;