import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useUsuario } from '../context/UsuarioContext';
import { reciclagemService } from '../services/api';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Input';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Loading } from '../components/Loading';
import { FiRefreshCw, FiTrendingUp } from 'react-icons/fi';

const ReciclagemContainer = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
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

const PontuacaoInfo = styled(Card)`
  background: ${theme.colors.gray[100]};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const PontuacaoTitle = styled.h3`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const PontuacaoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const PontuacaoItem = styled.div`
  background: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
  border: 2px solid ${props => props.selected ? theme.colors.primary : 'transparent'};
`;

const MaterialName = styled.div`
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.xs};
`;

const MaterialPoints = styled.div`
  color: ${theme.colors.primary};
  font-weight: 500;
  font-size: 14px;
`;

const SuccessMessage = styled(Alert)`
  margin-top: ${theme.spacing.lg};
`;

const TIPOS_RESIDUO = {
  PAPEL: { nome: 'Papel', pontos: 2.0, emoji: '📄' },
  VIDRO: { nome: 'Vidro', pontos: 3.0, emoji: '🍶' },
  METAL: { nome: 'Metal', pontos: 5.0, emoji: '🥫' },
  PLASTICO: { nome: 'Plástico', pontos: 1.5, emoji: '🍼' },
};

export const Reciclagem = () => {
  const { usuario, atualizarUsuario } = useUsuario();
  const [tipoResiduo, setTipoResiduo] = useState('');
  const [peso, setPeso] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [pontosCalculados, setPontosCalculados] = useState(0);

  useEffect(() => {
    if (tipoResiduo && peso) {
      const pontosPorKg = TIPOS_RESIDUO[tipoResiduo]?.pontos || 0;
      const pontos = Math.round(parseFloat(peso) * pontosPorKg);
      setPontosCalculados(pontos);
    } else {
      setPontosCalculados(0);
    }
  }, [tipoResiduo, peso]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await reciclagemService.registrar(
        usuario.cpf,
        tipoResiduo,
        parseFloat(peso)
      );

      setSuccess(
        `Reciclagem registrada com sucesso! Você ganhou ${response.data.pontosGanhos} pontos.`
      );

      // Atualizar pontos do usuário
      atualizarUsuario({ pontos: response.data.totalPontos });

      // Limpar formulário
      setTipoResiduo('');
      setPeso('');
      setPontosCalculados(0);
    } catch (err) {
      console.error('Erro ao registrar reciclagem:', err);
      if (err.response?.data?.mensagem) {
        setError(err.response.data.mensagem);
      } else {
        setError('Erro ao registrar reciclagem. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading text="Registrando reciclagem..." />;
  }

  return (
    <ReciclagemContainer>
      <PageTitle>
      <FiRefreshCw />
        Registrar Reciclagem
      </PageTitle>

      <PontuacaoInfo>
        <PontuacaoTitle>
          <FiTrendingUp />
          Tabela de Pontuação
        </PontuacaoTitle>
        <PontuacaoGrid>
          {Object.entries(TIPOS_RESIDUO).map(([key, material]) => (
            <PontuacaoItem key={key} selected={tipoResiduo === key}>
              <MaterialName>
              {material.emoji} {material.nome}
              </MaterialName>
              <MaterialPoints>
                {material.pontos} pontos/kg
              </MaterialPoints>
            </PontuacaoItem>
          ))}
        </PontuacaoGrid>
      </PontuacaoInfo>

      <Card>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="tipoResiduo">Tipo de Material</Label>
            <Select
              id="tipoResiduo"
              value={tipoResiduo}
              onChange={(e) => setTipoResiduo(e.target.value)}
              required
            >
              <option value="">Selecione o tipo de material</option>
              {Object.entries(TIPOS_RESIDUO).map(([key, material]) => (
                <option key={key} value={key}>
                  {material.emoji} {material.nome} ({material.pontos} pontos/kg)
                </option>
              ))}
            </Select>
            <HelpText>Escolha o tipo de material que você está reciclando</HelpText>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="peso">Peso (kg)</Label>
            <Input
              id="peso"
              type="number"
              step="0.1"
              min="0.1"
              max="100"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="Ex: 2.5"
              required
            />
            <HelpText>Digite o peso em quilogramas (mínimo 0.1 kg)</HelpText>
          </FormGroup>

          {pontosCalculados > 0 && (
            <Alert type="info">
              Você ganhará aproximadamente <strong>{pontosCalculados} pontos</strong> com esta reciclagem!
            </Alert>
          )}

          <Button
            type="submit"
            disabled={!tipoResiduo || !peso || parseFloat(peso) < 0.1}
            fullWidth
            size="large"
          >
          <FiRefreshCw />
            Registrar Reciclagem
          </Button>

          {success && <SuccessMessage type="success">{success}</SuccessMessage>}
          {error && <Alert type="error">{error}</Alert>}
        </Form>
      </Card>
    </ReciclagemContainer>
  );
};
