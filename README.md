# CRM Financeiro

Este é um sistema de CRM Financeiro completo desenvolvido para pequenas e médias empresas, permitindo gestão de usuários, clientes, financeiro e visualização de dashboards.

## Tecnologias Utilizadas

- **Frontend**: HTML5, EJS, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js
- **Banco de Dados**: MySQL
- **Autenticação**: Sessão express, Bcrypt

## Instalação e Configuração

1.  **Pré-requisitos**:
    - Node.js instalado.
    - MySQL instalado e rodando.

2.  **Configuração do Banco de Dados**:
    - Abra seu gerenciador MySQL (Workbench, PHPMyAdmin, terminal).
    - Crie o banco de dados e as tabelas usando o arquivo `database.sql` fornecido na raiz do projeto.

3.  **Configuração de Variáveis de Ambiente**:
    - Edite o arquivo `.env` na raiz do projeto.
    - Configure `DB_USER` e `DB_PASSWORD` com suas credenciais do MySQL.
    - Se necessário, ajuste `DB_HOST`, `DB_NAME` e `PORT`.

4.  **Instalação de Dependências**:
    - Abra o terminal na pasta do projeto.
    - Execute o comando:
      ```bash
      npm install
      ```

5.  **Executar o Projeto**:
    - Para iniciar o servidor, execute:
      ```bash
      npm start
      ```
    - Ou para desenvolvimento (com reinício automático):
      ```bash
      npm run dev
      ```

6.  **Acessar**:
    - Abra o navegador e acesse: `http://localhost:3000`

## Funcionalidades

- **Autenticação Segura**: Login e Cadastro de usuários com senhas criptografadas.
- **Gestão de Clientes**: CRUD completo de clientes (Nome, CPF/CNPJ, Email, Telefone, Endereço).
- **Controle Financeiro**:
    - Registro de Receitas e Despesas.
    - Categorização de transações.
    - Vínculo com clientes.
    - Status de pagamento (Pago, Pendente, Atrasado).
- **Dashboard Interativo**:
    - Cards com saldo, receita e despesa total.
    - Gráfico de fluxo de caixa mensal.
    - Lista de clientes com maior faturamento.
    - Transações recentes.

## Estrutura do Projeto

- `/config`: Configuração do banco de dados.
- `/controllers`: Lógica de controle (Auth, Clientes, Financeiro, Dashboard).
- `/models`: Modelos de acesso ao banco de dados.
- `/routes`: Rotas da aplicação.
- `/views`: Telas HTML/EJS.
- `/public`: Arquivos estáticos (CSS, JS, imagens).
- `/middleware`: Middlewares de proteção de rotas.
