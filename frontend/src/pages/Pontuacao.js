import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/Card';
import { FiTrendingUp, FiRefreshCw, FiGift } from 'react-icons/fi';

const PontuacaoContainer = styled.div`
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

const Section = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.gray[700]};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const MateriaisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MaterialCard = styled(Card)`
  text-align: center;
  padding: ${theme.spacing.xl};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const MaterialEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing.lg};
`;

const MaterialNome = styled.h3`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.md};
  font-size: 1.3rem;
`;

const MaterialPontos = styled.div`
  color: ${theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: ${theme.spacing.sm};
`;

const MaterialDescricao = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: 14px;
  line-height: 1.5;
`;

const RecompensasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const RecompensaCard = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const RecompensaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const RecompensaIcon = styled.div`
  font-size: 2.5rem;
`;

const RecompensaInfo = styled.div`
  flex: 1;
`;

const RecompensaNome = styled.h3`
  color: ${theme.colors.gray[800]};
  margin-bottom: ${theme.spacing.xs};
`;

const RecompensaCusto = styled.div`
  color: ${theme.colors.primary};
  font-weight: bold;
  font-size: 1.1rem;
`;

const RecompensaDescricao = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.5;
`;

const DicasCard = styled(Card)`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.primaryDark});
  color: white;
  padding: ${theme.spacing.xl};
`;

const DicasTitle = styled.h3`
  margin-bottom: ${theme.spacing.lg};
  font-size: 1.3rem;
`;

const DicasList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DicaItem = styled.li`
  margin-bottom: ${theme.spacing.md};
  padding-left: ${theme.spacing.lg};
  position: relative;
  
  &:before {
    content: '💡';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const MATERIAIS = [
  {
    emoji: '📄',
    nome: 'Papel',
    pontos: '2 pontos/kg',
    descricao: 'Jornais, revistas, papéis de escritório, caixas de papelão limpos e secos.'
  },
  {
    emoji: '🍶',
    nome: 'Vidro',
    pontos: '3 pontos/kg',
    descricao: 'Garrafas, potes, frascos de vidro limpos e sem tampas metálicas.'
  },
  {
    emoji: '🥫',
    nome: 'Metal',
    pontos: '5 pontos/kg',
    descricao: 'Latas de alumínio, ferro, cobre e outros metais limpos.'
  },
  {
    emoji: '🍼',
    nome: 'Plástico',
    pontos: '1,5 pontos/kg',
    descricao: 'Garrafas PET, embalagens plásticas, sacolas limpas e secas.'
  }
];

const RECOMPENSAS = [
  {
    icon: '🎫',
    nome: 'Vale-Transporte',
    custo: '50 pontos',
    descricao: 'Válido para uma viagem no transporte público da cidade. Código gerado instantaneamente.'
  }
];

const DICAS = [
  'Limpe bem os materiais antes de reciclar para garantir a qualidade',
  'Separe os materiais por tipo para facilitar o processo',
  'Remova tampas e rótulos quando possível',
  'Acumule uma quantidade razoável antes de levar aos pontos de coleta',
  'Verifique os horários de funcionamento dos pontos de coleta',
  'Traga sua balança ou use as disponíveis nos pontos de coleta'
];

export const Pontuacao = () => {
  return (
    <PontuacaoContainer>
      <PageTitle>
        <FiTrendingUp />
        Tabela de Pontuação
      </PageTitle>

      <Section>
        <SectionTitle>
        <FiRefreshCw />
          Materiais Recicláveis
        </SectionTitle>
        <MateriaisGrid>
          {MATERIAIS.map((material, index) => (
            <MaterialCard key={index}>
              <MaterialEmoji>{material.emoji}</MaterialEmoji>
              <MaterialNome>{material.nome}</MaterialNome>
              <MaterialPontos>{material.pontos}</MaterialPontos>
              <MaterialDescricao>{material.descricao}</MaterialDescricao>
            </MaterialCard>
          ))}
        </MateriaisGrid>
      </Section>

      <Section>
        <SectionTitle>
          <FiGift />
          Recompensas Disponíveis
        </SectionTitle>
        <RecompensasGrid>
          {RECOMPENSAS.map((recompensa, index) => (
            <RecompensaCard key={index}>
              <RecompensaHeader>
                <RecompensaIcon>{recompensa.icon}</RecompensaIcon>
                <RecompensaInfo>
                  <RecompensaNome>{recompensa.nome}</RecompensaNome>
                  <RecompensaCusto>{recompensa.custo}</RecompensaCusto>
                </RecompensaInfo>
              </RecompensaHeader>
              <RecompensaDescricao>{recompensa.descricao}</RecompensaDescricao>
            </RecompensaCard>
          ))}
        </RecompensasGrid>
      </Section>

      <DicasCard>
        <DicasTitle>💡 Dicas para Maximizar seus Pontos</DicasTitle>
        <DicasList>
          {DICAS.map((dica, index) => (
            <DicaItem key={index}>{dica}</DicaItem>
          ))}
        </DicasList>
      </DicasCard>
    </PontuacaoContainer>
  );
};