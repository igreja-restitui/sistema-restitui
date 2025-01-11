const express = require("express");
const Grupo = require("../database/models/Grupo");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const slugify = require("slugify");

router.get("/", async (req, res) => {
  let msg = req.flash("success");

  // Busca todos os grupos do banco de dados
  const grupos = await Grupo.find();
  res.render("grupo/index", { grupos, msg });
});

// Rota para
router.get("/cadastro", isAuth, (req, res) => {
  res.render("grupo/cadastro");
});

// Rota POST para
router.post("/cadastro", async (req, res) => {
  try {
    // Captura os dados do formulário
    const { nome } = req.body;

    // Criação de um novo objeto Obra com os dados recebidos
    const grupo = new Grupo({
      nome,
      slug: slugify(nome).toLowerCase(),
    });

    // Salvar a nova grupo no banco de dados
    await grupo.save();

    req.flash("success", { msg: "Grupo cadastrado com sucesso" });

    res.redirect("/grupo");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o grupo.");
  }
});

module.exports = router;
