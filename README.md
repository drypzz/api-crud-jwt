# 🛠️ CRUD API com Autenticação JWT

## 📌 Informações Adicionais

- **Versão:** 1.0.0  
- **Última atualização:** 03/04/2025
- **Autor:** [drypzz](https://github.com/drypzz)

---

## 📋 Sobre o Projeto

Este projeto tem como objetivo principal a implementação e o estudo de um CRUD completo com autenticação segura utilizando JWT (JSON Web Token), aplicando boas práticas de desenvolvimento e a arquitetura MVC com Node.js e Sequelize.

O sistema permite:
- Registro e autenticação de usuários.
- Emissão de token JWT após login válido.
- Restrições de acesso a rotas protegidas (CRUD) para usuários não autenticados.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **JavaScript (ES6+)**
- **Express.js**
- **Sequelize (ORM)**
- **SQLite (banco local)**
- **JWT (jsonwebtoken)**
- **bcrypt (hash de senha)**
- **dotenv (variáveis de ambiente)**

---

## 🔐 Geração do JWT_SECRET

Para garantir a segurança dos tokens JWT, é necessário configurar uma chave secreta forte.

Execute este comando no terminal para gerar uma chave segura:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie o valor gerado e adicione ao arquivo `.env` na raiz do projeto:

```env
JWT_SECRET=sua_chave_gerada
```

---

## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/drypzz/api-crud-jwt.git
cd api-crud-jwt
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Configure o `.env`:
Crie um arquivo `.env` com a variável:
```env
JWT_SECRET=sua_chave_gerada
```

### 4. Rode as migrations (caso existam):
```bash
npx sequelize-cli db:migrate
```

### 5. Inicie o servidor:
```bash
npm start
```

O servidor será iniciado em `http://localhost:3000`

---

## 📫 Endpoints da API

> Os endpoints abaixo exigem autenticação via Bearer Token, exceto `/register` e `/login`.

| Método | Rota           | Descrição                     |
|--------|----------------|-------------------------------|
| POST   | `/register`    | Criação de novo usuário       |
| POST   | `/login`       | Login e geração do token JWT  |
| GET    | `/users`       | Lista todos os usuários       |
| GET    | `/users/:id`   | Retorna usuário por ID        |
| PUT    | `/users/:id`   | Atualiza dados de um usuário  |
| DELETE | `/users/:id`   | Remove um usuário             |

> 🔒 Rotas protegidas exigem o header:
```http
Authorization: Bearer SEU_TOKEN_JWT
```

---

> by drypzz