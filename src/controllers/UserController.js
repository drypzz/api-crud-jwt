const User = require("../models/User");

class UserController {

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ["password"] } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(Number(req.params.id), { attributes: { exclude: ["password"] } });
      
      if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });
      
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário." });
      console.log(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const { name } = req.body;
      const user = await User.findByPk(Number(req.params.id));

      if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

      user.name = name || user.name;
      await user.save();

      res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuário." });
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findByPk(Number(req.params.id));
      
      if (!user) return res.status(404).json({ message: "Usuário não encontrado!" });

      await user.destroy();
      res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuário." });
      console.log(error);
    }
  }

}

module.exports = UserController;