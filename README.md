Claro, Sena. Aqui está uma versão melhorada e padronizada do seu README.md com foco técnico, clareza de instruções e formatação consistente para desenvolvedores:

---

# 🌱 EcoRecicla - Sistema de Gamificação para Reciclagem

**EcoRecicla** é um sistema web que transforma o ato de reciclar em uma experiência gamificada. Usuários acumulam pontos ao registrar materiais recicláveis e podem trocá-los por recompensas, como vales-transporte.

---

## 🚀 Como Rodar o Projeto

### ⚙️ Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

* **Java** 11 ou superior
* **Node.js** 16 ou superior
* **Maven** (geralmente incluído com a JDK)

---

### 📦 Passo 1: Clonar o Repositório

```bash
git clone [URL_DO_REPOSITORIO]
cd ecorecicla
```

---

### 🔧 Passo 2: Executar o Backend

```bash
cd backend
mvn spring-boot:run
```

✅ O backend estará funcionando quando aparecer:

```
Tomcat started on port(s): 8081 (http)
Started ReciclagemApplication in X seconds
```

🌐 Acesse: `http://localhost:8081`
Deve retornar um JSON de status da API (`[]` ou outro conteúdo esperado).

---

### 💻 Passo 3: Executar o Frontend

Em um **novo terminal** (com o backend ainda em execução):

```bash
cd frontend
npm install      # Executar apenas na primeira vez
npm start
```

✅ O frontend estará funcionando quando aparecer:

```
Local: http://localhost:3000
webpack compiled successfully
```

---

## 🎮 Passo 4: Usar o Sistema

### 🧑‍💻 Login de Teste

* **CPF:** `12345678901`
* **Nome:** `Seu Nome`

### ♻️ Registrar Reciclagem

1. Escolha o tipo de material: Papel, Plástico, Vidro ou Metal
2. Digite o peso (em kg)
3. Clique em **"Registrar"**

### 🏆 Tabela de Pontuação

| Material | Pontos por Kg |
| -------- | ------------- |
| Papel    | 2 pts        |
| Plástico | 1,5 pts        |
| Vidro    | 3 pts        |
| Metal    | 5 pts        |

### 🎁 Recompensas

* **50 pontos = 1 vale-transporte**
* Ao atingir o total, um **código único** será gerado para troca.

---


