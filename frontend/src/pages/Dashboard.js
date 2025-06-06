import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { usuarioService } from '../services/api';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { Alert } from '../components/Alert';
import { 
  FiRefreshCw, 
  FiBarChart2, 
  FiGift, 
  FiTrendingUp,
  FiUsers,
  FiAward
} from 'react-icons/fi';

const DashboardContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const PointsDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: ${theme.spacing.lg} 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PointsLabel = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const MenuCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const MenuCardContent = styled(Card)`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${theme.spacing.xl};
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.gray[800]};
`;

const CardDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${theme.spacing.lg};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: 0.9rem;
`;

export const Dashboard = () => {
  const { usuario, atualizarUsuario } = useUsuario();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    usuariosAtivos: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Atualizar dados do usuário
        const usuarioResponse = await usuarioService.buscarUsuario(usuario.cpf);
        atualizarUsuario(usuarioResponse.data);

        // Carregar estatísticas (opcional)
        try {
          const rankingResponse = await usuarioService.obterRanking();
          setStats({
            totalUsuarios: rankingResponse.data.length,
            usuariosAtivos: rankingResponse.data.filter(u => u.pontos > 0).length,
          });
        } catch (statsError) {
          console.log('Erro ao carregar estatísticas:', statsError);
        }
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.cpf) {
      loadDashboardData();
    } else {
      setLoading(false);
    }
  }, [usuario?.cpf, atualizarUsuario]);

  if (loading) {
    return <Loading text="Carregando dashboard..." fullScreen />;
  }

  if (!usuario) {
    return (
      <DashboardContainer>
        <Alert type="error">Usuário não encontrado. Faça login novamente.</Alert>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {error && <Alert type="error">{error}</Alert>}
      
      <WelcomeCard>
        <WelcomeTitle>Olá, {usuario.nome}! 👋</WelcomeTitle>
        <PointsDisplay>{usuario.pontos || 0}</PointsDisplay>
        <PointsLabel>pontos acumulados</PointsLabel>
      </WelcomeCard>

      <MenuGrid>
        <MenuCard to="/reciclagem">
          <MenuCardContent>
            <CardIcon>
            <FiRefreshCw />
            </CardIcon>
            <CardTitle>Registrar Reciclagem</CardTitle>
            <CardDescription>
              Registre seus materiais recicláveis e ganhe pontos para trocar por benefícios
            </CardDescription>
          </MenuCardContent>
        </MenuCard>

        <MenuCard to="/historico">
          <MenuCardContent>
            <CardIcon>
            <FiBarChart2 />
            </CardIcon>
            <CardTitle>Histórico</CardTitle>
            <CardDescription>
              Consulte seu histórico completo de reciclagem e transações
            </CardDescription>
          </MenuCardContent>
        </MenuCard>

        <MenuCard to="/trocar-pontos">
          <MenuCardContent>
            <CardIcon>
              <FiGift />
            </CardIcon>
            <CardTitle>Trocar Pontos</CardTitle>
            <CardDescription>
              Troque seus pontos por vale-transporte e outros benefícios
            </CardDescription>
          </MenuCardContent>
        </MenuCard>

        <MenuCard to="/pontuacao">
          <MenuCardContent>
            <CardIcon>
              <FiTrendingUp />
            </CardIcon>
            <CardTitle>Tabela de Pontuação</CardTitle>
            <CardDescription>
              Veja quantos pontos cada tipo de material reciclável vale
            </CardDescription>
          </MenuCardContent>
        </MenuCard>
      </MenuGrid>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.totalUsuarios}</StatValue>
          <StatLabel>
            <FiUsers style={{ marginRight: '4px' }} />
            Total de Usuários
          </StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{stats.usuariosAtivos}</StatValue>
          <StatLabel>
            <FiAward style={{ marginRight: '4px' }} />
            Usuários Ativos
          </StatLabel>
        </StatCard>

        <StatCard>
          <StatValue>{Math.floor((usuario.pontos || 0) / 50)}</StatValue>
          <StatLabel>
            <FiGift style={{ marginRight: '4px' }} />
            Vales Disponíveis
          </StatLabel>
        </StatCard>
      </StatsGrid>
    </DashboardContainer>
  );
};