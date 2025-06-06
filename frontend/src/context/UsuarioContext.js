import React, { createContext, useContext, useState, useEffect } from 'react';

const UsuarioContext = createContext();

export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error('useUsuario deve ser usado dentro de UsuarioProvider');
  }
  return context;
};

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar localStorage na inicialização
  useEffect(() => {
    const checkAuth = () => {
      try {
        const usuarioSalvo = localStorage.getItem('usuario');
        if (usuarioSalvo && usuarioSalvo !== 'undefined') {
          const usuarioData = JSON.parse(usuarioSalvo);
          if (usuarioData && usuarioData.cpf) {
            setUsuario(usuarioData);
            setIsLoggedIn(true);
          } else {
            // Dados inválidos, limpa
            localStorage.removeItem('usuario');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('usuario');
      }
    };

    checkAuth();
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    setIsLoggedIn(true);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    setIsLoggedIn(false);
    localStorage.removeItem('usuario');
  };

  const atualizarUsuario = (dadosAtualizados) => {
    const usuarioAtualizado = { ...usuario, ...dadosAtualizados };
    setUsuario(usuarioAtualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
  };

  const value = {
    usuario,
    isLoggedIn,
    login,
    logout,
    atualizarUsuario
  };

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
};