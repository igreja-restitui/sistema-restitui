const express = require("express");
const User = require("../database/models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.get("/cadastro", (req, res) => {
  res.render("user/cadastro");
});

router.post("/cadastro", (req, res) => {
  const { nome, email, password } = req.body;

  // Valida os dados do formulário

  if (!nome || !email || !password) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  } else {
    const salt = 10;
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erro ao hashar a senha.");
      } else {
        const novoUsuario = new User({ nome, email, password: hashedPassword });
        novoUsuario.save().then(() => {
          res.send("cadastrado com sucesso");
        });
      }
    });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(401).send("Email ou senha inválidos.");
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao comparar as senhas.");
      }
      if (isMatch) {
        // Criando o token
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            nome: user.nome,
            role: user.role,
          }, // Payload
          "secreta-chave", // Chave secreta para assinar o token
          { expiresIn: "1h" } // O token expira em 1 hora
        );

        // Salvar o token nos cookies
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        }); // 1h

        res.redirect("/");
      } else {
        return res.status(401).send("Email ou senha inválidos.");
      }
    });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("authToken"); // Limpa o cookie do token
  res.redirect("/"); // Redireciona para a página de login
});

module.exports = router; // Exporta o router para ser usado no app.js
