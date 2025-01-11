// middleware/adminMiddleware.js
const isAdmin = (req, res, next) => {
  if (res.locals.user && res.locals.user.role === "admin") {
    return next(); // Usuário é admin, segue para a próxima rota
  } else {
    return res.status(403).send("Acesso negado. Você não tem permissão.");
  }
};

module.exports = isAdmin;
