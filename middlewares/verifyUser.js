// middleware/userMiddleware.js
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    // Se não houver token, passa para o próximo middleware ou rota
    res.locals.user = null; // Não há usuário logado
    return next();
  }

  // Se o token existir, tenta decodificar e coloca o usuário em res.locals
  jwt.verify(token, "secreta-chave", (err, decoded) => {
    if (err) {
      res.locals.user = null; // Token inválido, não há usuário logado
      return next();
    }

    // Se o token for válido, coloca o usuário em res.locals
    res.locals.user = decoded;
    next();
  });
};

module.exports = verifyUser;
