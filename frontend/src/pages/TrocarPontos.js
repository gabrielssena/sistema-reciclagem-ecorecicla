import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { reciclagemService } from '../services/api';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Loading } from '../components/Loading';
import { FiGift, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const TrocarContainer = styled.div`
  padding: ${theme.spacing.xl};
  max-width: 800px;
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

const PontosCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PontosDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const PontosLabel = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const RecompensaCard = styled(Card)`
  margin-bottom: ${theme.spacing.lg};
`;

const RecompensaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
    text-align: center;
  }
`;

const RecompensaInfo = styled.div`
  flex: 1;
`;

const RecompensaTitle = styled.h3`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const RecompensaDescricao = styled.p`
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
`;

const RecompensaCusto = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const StatusIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.disponivel ? theme.colors.success : theme.colors.gray[400]};
`;

const StatusText = styled.div`
  font-size: 14px;
  color: ${props => props.disponivel ? theme.colors.success : theme.colors.gray[500]};
  font-weight: 500;
`;

const CodigoVale = styled(Card)`
  background: ${theme.colors.success};
  color: white;
  text-align: center;
  margin-top: ${theme.spacing.lg};
`;

const CodigoTitle = styled.h3`
  margin-bottom: ${theme.spacing.md};
`;

const CodigoTexto = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.md};
`;

const CodigoInstrucoes = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

const PONTOS_VALE_TRANSPORTE = 50;

export const TrocarPontos = () => {
  const { usuario, atualizarUsuario } = useUsuario();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [codigoVale, setCodigoVale] = useState('');

  const pontosDisponiveis = usuario?.pontos || 0;
  const podeResgatar = pontosDisponiveis >= PONTOS_VALE_TRANSPORTE;

  const handleTrocarPontos = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await reciclagemService.trocarPontos(usuario.cpf);
      
      setSuccess(response.data.mensagem);
      setCodigoVale(response.data.codigoVale);
      
      // Atualizar pontos do usuário
      atualizarUsuario({ pontos: response.data.pontosRestantes });
      
    } catch (err) {
      console.error('Erro ao trocar pontos:', err);
      if (err.response?.data?.mensagem) {
        setError(err.response.data.mensagem);
      } else {
        setError('Erro ao processar a troca. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Processando troca..." />;
  }

  return (
    <TrocarContainer>
      <PageTitle>
        <FiGift />
        Trocar Pontos
      </PageTitle>

      <PontosCard>
        <PontosDisplay>{pontosDisponiveis}</PontosDisplay>
        <PontosLabel>pontos disponíveis</PontosLabel>
      </PontosCard>

      <RecompensaCard>
        <RecompensaHeader>
          <RecompensaInfo>
            <RecompensaTitle>
              🎫 Vale-Transporte
            </RecompensaTitle>
            <RecompensaDescricao>
              Troque seus pontos por um vale-transporte válido para uso no transporte público da cidade.
            </RecompensaDescricao>
            <RecompensaCusto>
              {PONTOS_VALE_TRANSPORTE} pontos
            </RecompensaCusto>
          </RecompensaInfo>

          <StatusContainer>
            <StatusIcon disponivel={podeResgatar}>
              {podeResgatar ? <FiCheckCircle /> : <FiAlertCircle />}
            </StatusIcon>
            <StatusText disponivel={podeResgatar}>
              {podeResgatar ? 'Disponível' : 'Pontos Insuficientes'}
            </StatusText>
          </StatusContainer>
        </RecompensaHeader>

        {!podeResgatar && (
          <Alert type="warning">
            Você precisa de mais {PONTOS_VALE_TRANSPORTE - pontosDisponiveis} pontos para resgatar um vale-transporte.
            Continue reciclando para acumular mais pontos!
          </Alert>
        )}

        <Button
          onClick={handleTrocarPontos}
          disabled={!podeResgatar}
          fullWidth
          size="large"
        >
          <FiGift />
          Trocar por Vale-Transporte
        </Button>

        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
      </RecompensaCard>

      {codigoVale && (
        <CodigoVale>
          <CodigoTitle>🎉 Vale-Transporte Gerado!</CodigoTitle>
          <CodigoTexto>{codigoVale}</CodigoTexto>
          <CodigoInstrucoes>
            Apresente este código no terminal de ônibus ou estação de metrô para utilizar seu vale-transporte.
          </CodigoInstrucoes>
        </CodigoVale>
      )}
    </TrocarContainer>
  );
};