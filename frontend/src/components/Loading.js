import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xxl};
  min-height: ${props => props.fullScreen ? '100vh' : '200px'};
`;

const Spinner = styled.div`
  border: 4px solid ${theme.colors.gray[200]};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${theme.spacing.md};
`;

const LoadingText = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: 16px;
`;

export const Loading = ({ text = 'Carregando...', fullScreen = false }) => (
  <LoadingContainer fullScreen={fullScreen}>
    <Spinner />
    <LoadingText>{text}</LoadingText>
  </LoadingContainer>
);