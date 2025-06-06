import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UsuarioProvider, useUsuario } from './context/UsuarioContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Reciclagem } from './pages/Reciclagem';
import { Historico } from './pages/Historico';
import { TrocarPontos } from './pages/TrocarPontos';
import { Pontuacao } from './pages/Pontuacao';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUsuario();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

// Componente para redirecionar usuários logados
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useUsuario();
  return !isLoggedIn ? children : <Navigate to="/dashboard" replace />;
};

const AppContent = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/reciclagem" 
          element={
            <ProtectedRoute>
              <Reciclagem />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/historico" 
          element={
            <ProtectedRoute>
              <Historico />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/trocar-pontos" 
          element={
            <ProtectedRoute>
              <TrocarPontos />
            </ProtectedRoute>
          } 
        />
        <Route path="/pontuacao" element={<Pontuacao />} />
        {/* Redireciona qualquer rota não encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <UsuarioProvider>
      <AppContent />
    </UsuarioProvider>
  );
}

export default App;