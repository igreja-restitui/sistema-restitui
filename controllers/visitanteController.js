const express = require("express");
const Visitante = require("../database/models/Visitante");
const Membro = require("../database/models/Membro");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const { DateTime } = require("luxon");

router.get("/", isAuth, async (req, res) => {
  try {
    // Busca todos os visitantes
    const visitantes = await Visitante.find();

    res.render("visitante/index", { visitantes });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar avisos", error: err });
  }
});

// Rota para
router.get("/cadastro", isAuth, async (req, res) => {
  res.render("visitante/cadastro");
});

// // Rota POST para
router.post("/cadastro", async (req, res) => {
  try {
    // Captura os dados do formulário
    const { nome, telefone } = req.body;

    const visitante = new Visitante({
      nome,
      telefone,
    });

    // Salvar a nova grupo no banco de dados
    await visitante.save();

    res.redirect("/visitante");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o visitante.");
  }
});

router.post("/presenca", async (req, res) => {
  try {
    req.flash("success", { msg: "Membro cadastrado com sucesso" });
    // Captura os dados do formulário
    const { id } = req.body;

    // Atualiza o campo qtdCultos somando 1 e obtém o documento atualizado
    const visitanteAtualizado = await Visitante.findByIdAndUpdate(
      id,
      { $inc: { qtdCultos: 1 } }, // Incrementa qtdCultos em 1
      { new: true } // Retorna o documento atualizado
    );

    // Verifica se o visitante foi encontrado
    if (!visitanteAtualizado) {
      return res.status(404).send("Visitante não encontrado.");
    }

    // Se qtdCultos for igual ou maior que 5, move o visitante para membros e remove da tabela de visitantes
    if (visitanteAtualizado.qtdCultos >= 5) {
      // Cria um novo registro na tabela de membros
      const novoMembro = new Membro({
        nome: visitanteAtualizado.nome,
        telefone: visitanteAtualizado.telefone,
      });
      await novoMembro.save();

      // Exclui o visitante
      await Visitante.findByIdAndDelete(id);

      return res.redirect("/membro");
    }

    // Responde com sucesso se não atingir 5 cultos ainda
    res.redirect("/visitante");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar a presença do visitante.");
  }
});

module.exports = router;
