const express = require("express");
const cors = require("cors");
require("dotenv").config();

const AuthController = require("./src/controllers/AuthController");
const UserController = require("./src/controllers/UserController");
const authMiddleware = require("./src/middlewares/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de Autenticação
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// Rotas Protegidas (CRUD)
app.get("/users", authMiddleware.verifyToken, UserController.getAllUsers);
app.get("/users/:id", authMiddleware.verifyToken, UserController.getUserById);
app.put("/users/:id", authMiddleware.verifyToken, UserController.updateUser);
app.delete("/users/:id", authMiddleware.verifyToken, UserController.deleteUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
