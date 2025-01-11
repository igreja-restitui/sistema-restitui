const express = require("express");
const Membro = require("../database/models/Membro");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

router.get("/", isAdmin, async (req, res) => {
  try {
    // Busca todos os membros
    let msg = req.flash("success");
    const membros = await Membro.find();

    res.render("membro/index", { membros, msg });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar membros", error: err });
  }
});

router.get("/cadastro", isAuth, async (req, res) => {
  res.render("membro/cadastro");
});

router.post("/cadastro", async (req, res) => {
  try {
    // Desestruturando os dados recebidos do formulário
    const { nome, telefone, email, idade, dataEntrada } = req.body;

    // Convertendo a data de entrada para o formato dd/MM/yyyy
    const dataEntradaFormatada = formatDate(dataEntrada);

    // Criar um novo membro com os dados recebidos
    const novoMembro = new Membro({
      nome,
      telefone,
      email,
      idade,
      dataEntrada: dataEntradaFormatada, // A data de entrada será no formato 'dd/MM/yyyy'
    });

    // Salvar o novo membro no banco de dados
    await novoMembro.save();

    res.redirect("/membro"); // ou para onde você desejar redirecionar
  } catch (err) {
    console.error("Erro ao cadastrar o membro:", err);
    res.redirect("/membro/cadastro"); // Volta para o formulário em caso de erro
  }
});

module.exports = router;
