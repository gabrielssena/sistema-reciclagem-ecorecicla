🌱 EcoRecicla - Sistema de Gamificação para Reciclagem
Sistema web que transforma reciclagem em jogo, permitindo que usuários ganhem pontos ao reciclar materiais e troquem por recompensas.

🚀 Como Rodar o Aplicativo
⚠️ Pré-requisitos
Java 11 ou superior
Node.js 16 ou superior
Maven (geralmente vem com Java)

📦 Passo 1: Baixar o Projeto

# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd ecorecicla

🔧 Passo 2: Rodar o Backend
# Entre na pasta do backend
cd backend

# Execute o servidor
mvn spring-boot:run

✅ Backend funcionando quando aparecer:

Tomcat started on port(s): 8081 (http)
Started ReciclagemApplication in X seconds
🌐 Acesse: 
localhost
 (deve mostrar [])

 💻 Passo 3: Rodar o Frontend
Abra um NOVO terminal (deixe o backend rodando):
# Entre na pasta do frontend
cd frontend

# Instale as dependências (só na primeira vez)
npm install

# Execute o frontend
npm start

✅ Frontend funcionando quando aparecer:

Local: http://localhost:3000
webpack compiled successfully

🎮 Passo 4: Usar o Sistema
Faça Login:

CPF: 12345678901
Nome: Seu Nome
Registre uma Reciclagem:

Escolha o material (Papel, Plástico, Vidro, Metal)
Digite o peso em kg
Clique em "Registrar"
Veja seus Pontos:

Papel: 10 pontos/kg
Plástico: 15 pontos/kg
Vidro: 20 pontos/kg
Metal: 25 pontos/kg
Troque por Vale-Transporte:

50 pontos = 1 vale-transporte
Receba um código único
