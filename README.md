🌱 EcoRecicla - Sistema de Reciclagem Inteligente



Transformando reciclagem em recompensas através da gamificação







🎯 Sobre o Projeto
O EcoRecicla é um sistema web inovador que incentiva práticas sustentáveis através da gamificação. Os usuários ganham pontos ao registrar materiais reciclados e podem trocar por recompensas, contribuindo diretamente para o ODS 11 - Cidades e Comunidades Sustentáveis.
🌍 Impacto Social

📈 Aumenta a taxa de reciclagem urbana
🎮 Gamifica comportamentos sustentáveis  
🏆 Recompensa ações ambientalmente responsáveis
📚 Educa sobre sustentabilidade e meio ambiente


✨ Funcionalidades Principais




🔐 Autenticação Segura

Login/cadastro por CPF
Sessão persistente
Logout seguro
Validação de dados

♻️ Sistema de Reciclagem

Registro de 4 tipos de materiais
Cálculo automático de pontos
Interface intuitiva
Validação de peso




🎁 Sistema de Recompensas

Troca de pontos por vale-transporte
Histórico completo de transações
Dashboard personalizado
Acompanhamento de progresso

📱 Interface Moderna

Design responsivo
Tema sustentável
Navegação fluida
Feedback visual em tempo real






🏗️ Arquitetura do Sistema
graph TB
    A[👤 Usuário] --> B[🌐 Frontend React]
    B --> C[🔗 API REST]
    C --> D[⚙️ Spring Boot]
    D --> E[🗄️ Banco H2]
    
    F[📊 Dashboard] --> B
    G[♻️ Reciclagem] --> B
    H[📈 Histórico] --> B
    I[🎁 Recompensas] --> B


🛠️ Stack Tecnológica


Backend




Frontend







🚀 Instalação e Execução
📋 Pré-requisitos

☕ Java 11 ou superior
📦 Node.js 16 ou superior  
🔧 Maven 3.6+
🌐 Git

1️⃣ Clone o Repositório
git clone https://github.com/SEU_USUARIO/sistema-reciclagem-ecorecicla.git
cd sistema-reciclagem-ecorecicla

2️⃣ Execute o Backend
cd backend
mvn clean install
mvn spring-boot:run

🌐 Backend disponível em: http://localhost:8080
3️⃣ Execute o Frontend
cd frontend
npm install
npm start

🌐 Frontend disponível em: http://localhost:3000

🎮 Como Usar
1. Primeiro Acesso

🌐 Acesse http://localhost:3000
📝 Digite seu CPF (11 dígitos)
✍️ Informe seu nome
🚀 Clique em "Entrar"

2. Registrar Reciclagem

♻️ Clique em "Reciclar"
📦 Escolha o tipo de material
⚖️ Informe o peso em kg
💾 Registre e ganhe pontos!

3. Acompanhar Progresso

📊 Visualize seus pontos no Dashboard
📈 Consulte o histórico de transações
🎁 Troque pontos por recompensas


💰 Sistema de Pontuação





Material
Pontos por Kg
Exemplo



📄 Papel
2 pts
5kg = 10 pontos


🥃 Vidro
3 pts
3kg = 9 pontos


🔩 Metal
5 pts
2kg = 10 pontos


🧴 Plástico
1.5 pts
4kg = 6 pontos


🎁 Recompensas Disponíveis
Vale-Transporte: 50 pontos



📁 Estrutura do Projeto
sistema-reciclagem-ecorecicla/
├── 🔧 backend/                    # API Spring Boot
│   ├── src/main/java/
│   │   └── com/ecorecicla/
│   │       ├── 📋 controller/     # Controladores REST
│   │       ├── 🏗️ model/          # Entidades JPA
│   │       ├── 🔍 repository/     # Repositórios de dados
│   │       └── ⚙️ service/        # Lógica de negócio
│   ├── src/main/resources/        # Configurações
│   └── pom.xml                    # Dependências Maven
├── 🎨 frontend/                   # Aplicação React
│   ├── src/
│   │   ├── 🧩 components/         # Componentes reutilizáveis
│   │   ├── 📱 pages/              # Páginas da aplicação
│   │   ├── 🔗 services/           # Serviços de API
│   │   ├── 🎨 styles/             # Estilos e temas
│   │   └── 🔄 context/            # Contextos React
│   └── package.json               # Dependências NPM
└── 📖 README.md                   # Este arquivo


🔗 Endpoints da API

📋 Ver todos os endpoints

👤 Usuários
POST   /api/usuarios/login          # Login/Cadastro
GET    /api/usuarios/{cpf}          # Buscar usuário
PUT    /api/usuarios/{cpf}          # Atualizar usuário

♻️ Reciclagem
POST   /api/reciclagem              # Registrar reciclagem
GET    /api/reciclagem/usuario/{cpf} # Histórico do usuário

🎁 Recompensas
POST   /api/recompensas/trocar      # Trocar pontos
GET    /api/recompensas/usuario/{cpf} # Recompensas do usuário




🧪 Testes e Qualidade
🔍 Executar Testes
# Backend
cd backend
mvn test

# Frontend  
cd frontend
npm test

📊 Cobertura de Código

✅ Testes unitários
✅ Testes de integração
✅ Validação de dados
✅ Tratamento de erros


🌟 Demonstração
🎬 Screenshots





Tela de Login
Dashboard Principal










Sistema de Reciclagem
Histórico de Transações










🤝 Contribuição
Contribuições são muito bem-vindas! Para contribuir:

🍴 Fork o projeto
🌿 Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
💾 Commit suas mudanças (git commit -m 'Add some AmazingFeature')
📤 Push para a branch (git push origin feature/AmazingFeature)
🔄 Abra um Pull Request

🐛 Reportar Bugs
Encontrou um bug? Abra uma issue com:

📝 Descrição detalhada
🔄 Passos para reproduzir
💻 Informações do ambiente
📸 Screenshots (se aplicável)


📈 Roadmap

 📊 Dashboard Analytics - Gráficos de impacto ambiental
 🏆 Sistema de Ranking - Competição entre usuários  
 📱 App Mobile - Versão para dispositivos móveis
 🔔 Notificações - Lembretes de reciclagem
 🌍 Integração Maps - Localização de pontos de coleta
 🎯 Metas Pessoais - Objetivos de reciclagem
 💳 Mais Recompensas - Parcerias com empresas locais
 🤖 IA para Classificação - Reconhecimento automático de materiais


📄 Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

👨‍💻 Autor


Desenvolvido com 💚 para um mundo mais sustentável





🙏 Agradecimentos

🌱 ONU - Pelos Objetivos de Desenvolvimento Sustentável
♻️ Comunidade Open Source - Pelas ferramentas incríveis
🌍 Todos que se preocupam com o meio ambiente




⭐ Se este projeto te ajudou, deixe uma estrela!

