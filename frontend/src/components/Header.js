import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { FiUser, FiLogOut, FiHome, FiBarChart2, FiRefreshCw, FiGift } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  padding: ${theme.spacing.md} 0;
  box-shadow: ${theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: ${theme.spacing.sm};
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: 12px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const Points = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-weight: bold;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export const Header = () => {
  const { usuario, isLoggedIn } = useUsuario();

  // Logout mais agressivo
  const handleLogout = () => {
    // Limpa TUDO
    localStorage.clear();
    sessionStorage.clear();
    
    // Remove cookies se houver
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    
    // Força redirecionamento imediato
    window.location.replace('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to={isLoggedIn ? "/dashboard" : "/"}>
          🌱 EcoRecicla
        </Logo>
        
        {isLoggedIn && (
          <>
            <Nav>
              <NavLink to="/dashboard">
                <FiHome size={16} />
                Dashboard
              </NavLink>
              <NavLink to="/reciclagem">
                <FiRefreshCw size={16} />
                Reciclar
              </NavLink>
              <NavLink to="/historico">
                <FiBarChart2 size={16} />
                Histórico
              </NavLink>
              <NavLink to="/trocar-pontos">
                <FiGift size={16} />
                Trocar
              </NavLink>
            </Nav>
            
            <UserSection>
              <UserInfo>
                <FiUser size={16} />
                <UserName>{usuario?.nome}</UserName>
                <Points>{usuario?.pontos || 0} pts</Points>
              </UserInfo>
              
              <LogoutButton onClick={handleLogout}>
                <FiLogOut size={16} />
                Sair
              </LogoutButton>
            </UserSection>
          </>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};