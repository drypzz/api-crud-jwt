const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


class AuthController {
  
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      const userExists = await User.findOne({ where: { email } });
      if (userExists) return res.status(400).json({ message: "Email já cadastrado!" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: "Senha incorreta!" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      res.status(500).json({ error: "Erro ao fazer login." });
      console.log(error);
    }
  }

}

module.exports = AuthController;