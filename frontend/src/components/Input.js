import styled from 'styled-components';
import { theme } from '../styles/theme';

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  &:invalid {
    border-color: ${theme.colors.error};
  }

  &::placeholder {
    color: ${theme.colors.gray[500]};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 14px;
    font-size: 16px; /* Evita zoom no iOS */
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 14px;
  }
`;