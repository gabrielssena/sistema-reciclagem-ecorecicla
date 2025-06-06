import styled from 'styled-components';
import { theme } from '../styles/theme';

export const Card = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${props => props.padding || theme.spacing.xl};
  margin-bottom: ${theme.spacing.lg};
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-2px);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
  }
`;