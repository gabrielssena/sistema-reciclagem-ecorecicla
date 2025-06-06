import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { reciclagemService } from '../services/api';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Loading } from '../components/Loading';
import { FiBarChart2, FiCalendar, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const HistoricoContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};
  }
`;

const PageTitle = styled.h1`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const TransacaoCard = styled(Card)`
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
`;

const TransacaoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const TransacaoInfo = styled.div`
  flex: 1;
`;

const TransacaoTipo = styled.h3`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const TransacaoDetalhes = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: 14px;
  margin-bottom: ${theme.spacing.xs};
`;

const TransacaoData = styled.p`
  color: ${theme.colors.gray[500]};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const PontosContainer = styled.div`
  text-align: right;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    text-align: left;
  }
`;

const Pontos = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.positivo ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  justify-content: flex-end;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.gray[500]};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
`;

const TIPOS_RESIDUO_EMOJI = {
  PAPEL: '📄',
  VIDRO: '🍶',
  METAL: '🥫',
  PLASTICO: '🍼',
};

export const Historico = () => {
  const { usuario } = useUsuario();
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistorico = async () => {
      try {
        const response = await reciclagemService.consultarHistorico(usuario.cpf);
        setTransacoes(response.data);
      } catch (err) {
        console.error('Erro ao carregar histórico:', err);
        if (err.response?.status === 404) {
          setTransacoes([]);
        } else {
          setError('Erro ao carregar histórico. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (usuario?.cpf) {
      loadHistorico();
    }
  }, [usuario?.cpf]);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderTransacao = (transacao) => {
    const isReciclagem = transacao.tipoOperacao === 'RECICLAGEM';
    const emoji = isReciclagem ? TIPOS_RESIDUO_EMOJI[transacao.tipoResiduo] : '🎫';
    
    return (
      <TransacaoCard key={transacao.id}>
        <TransacaoHeader>
          <TransacaoInfo>
            <TransacaoTipo>
              {emoji}
              {isReciclagem ? 
                `Reciclagem - ${transacao.tipoResiduo}` : 
                'Troca por Vale-Transporte'
              }
            </TransacaoTipo>
            
            {isReciclagem && (
              <TransacaoDetalhes>
                Peso: {transacao.peso} kg
              </TransacaoDetalhes>
            )}
            
            {transacao.observacao && (
              <TransacaoDetalhes>
                {transacao.observacao}
              </TransacaoDetalhes>
            )}
            
            <TransacaoData>
              <FiCalendar size={12} />
              {formatarData(transacao.dataTransacao)}
            </TransacaoData>
          </TransacaoInfo>
          
          <PontosContainer>
            <Pontos positivo={transacao.pontosGanhos > 0}>
              {transacao.pontosGanhos > 0 ? (
                <FiTrendingUp size={20} />
              ) : (
                <FiTrendingDown size={20} />
              )}
              {transacao.pontosGanhos > 0 ? '+' : ''}{transacao.pontosGanhos}
            </Pontos>
          </PontosContainer>
        </TransacaoHeader>
      </TransacaoCard>
    );
  };

  if (loading) {
    return <Loading text="Carregando histórico..." />;
  }

  return (
    <HistoricoContainer>
      <PageTitle>
        <FiBarChart2 />
        Histórico de Transações
      </PageTitle>

      {error && <Alert type="error">{error}</Alert>}

      {transacoes.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <h3>Nenhuma transação encontrada</h3>
          <p>Comece reciclando materiais para ver seu histórico aqui!</p>
        </EmptyState>
      ) : (
        transacoes.map(renderTransacao)
      )}
    </HistoricoContainer>
  );
};