import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
  background: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'warning': return '#fff3cd';
      case 'error': return '#f8d7da';
      default: return '#d1ecf1';
    }
  }};
  border: 1px solid ${props => {
    switch (props.type) {
      case 'success': return '#c3e6cb';
      case 'warning': return '#ffeaa7';
      case 'error': return '#f5c6cb';
      default: return '#bee5eb';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'warning': return '#856404';
      case 'error': return '#721c24';
      default: return '#0c5460';
    }
  }};
`;

const IconWrapper = styled.div`
  margin-right: ${theme.spacing.md};
  display: flex;
  align-items: center;
`;

const AlertText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
`;

const getIcon = (type) => {
  switch (type) {
    case 'success': return <FiCheckCircle size={20} />;
    case 'warning': return <FiAlertCircle size={20} />;
    case 'error': return <FiXCircle size={20} />;
    default: return <FiInfo size={20} />;
  }
};

export const Alert = ({ type = 'info', children }) => (
  <AlertContainer type={type}>
    <IconWrapper>{getIcon(type)}</IconWrapper>
    <AlertText>{children}</AlertText>
  </AlertContainer>
);