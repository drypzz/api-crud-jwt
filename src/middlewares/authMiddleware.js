const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthMiddleware {

  static verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Acesso negado!" });

    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      res.status(403).json({ message: "Token inválido!" });
    }
  }
  
}

module.exports = AuthMiddleware;