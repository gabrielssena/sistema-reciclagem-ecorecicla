import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { usuarioService } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Loading } from '../components/Loading';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: ${theme.spacing.xl};
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  font-size: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.xl};
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  text-align: left;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.gray[700]};
  font-size: 14px;
`;

const HelpText = styled.small`
  color: ${theme.colors.gray[500]};
  font-size: 12px;
`;

export const Login = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUsuario();
  const navigate = useNavigate();

  const formatCpf = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 11);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await usuarioService.login(cpf, nome);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no login:', err);
      if (err.response?.data?.mensagem) {
        setError(err.response.data.mensagem);
      } else {
        setError('Erro ao fazer login. Verifique seus dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Fazendo login..." fullScreen />;
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Title>🌱 EcoRecicla</Title>
        <Subtitle>Sistema de Incentivo à Reciclagem</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="Digite seu CPF (apenas números)"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              required
              maxLength={11}
            />
            <HelpText>Digite apenas os números do CPF</HelpText>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome (se for novo usuário)"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <HelpText>Obrigatório apenas para novos usuários</HelpText>
          </FormGroup>
          
          {error && <Alert type="error">{error}</Alert>}
          
          <Button 
            type="submit" 
            disabled={cpf.length !== 11} 
            fullWidth 
            size="large"
          >
            Entrar
          </Button>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};