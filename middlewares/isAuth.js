// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.send("Precisa estar logado para acessar");
  }

  // Verifica o token
  jwt.verify(token, "secreta-chave", (err, decoded) => {
    if (err) {
      // Se o token for inválido
      return res.status(403).send("Token inválido.");
    }

    // Se o token for válido, coloca o usuário em res.locals
    res.locals.user = decoded;
    next(); // Chama o próximo middleware ou rota
  });
};

module.exports = authenticateToken;
