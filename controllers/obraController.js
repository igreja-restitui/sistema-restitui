const express = require("express");
const Obra = require("../database/models/Obra");
const router = express.Router(); // Criando o router para controlar as rotas
const { Parser } = require("json2csv");

// Rota GET para exibir as tabelas com as obras separadas por time
router.get("/", async (req, res) => {
  try {
    //Busca por time
    const obrasVermelho = await Obra.find({
      time: "Vermelho",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    // Busca separadas por time e por grupo
    const obrasVermelhoHomens = await Obra.find({
      time: "Vermelho",
      grupo: "Homens",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVermelhoMulheres = await Obra.find({
      time: "Vermelho",
      grupo: "Mulheres",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVermelhoJovens = await Obra.find({
      time: "Vermelho",
      grupo: "Jovens",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVermelhoCriancas = await Obra.find({
      time: "Vermelho",
      grupo: "Crianças",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    //BUSCA GERAL POR TIME
    const obrasVerde = await Obra.find({ time: "Verde" }).sort({ nome: 1 }); // Ordena

    //BUSCA POR TIME E GRUPO
    const obrasVerdeHomens = await Obra.find({
      time: "Verde",
      grupo: "Homens",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVerdeMulheres = await Obra.find({
      time: "Verde",
      grupo: "Mulheres",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVerdeJovens = await Obra.find({
      time: "Verde",
      grupo: "Jovens",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    const obrasVerdeCriancas = await Obra.find({
      time: "Vermelho",
      grupo: "Crianças",
    })
      .collation({ locale: "pt", strength: 1 })
      .sort({ nome: 1 });

    // Renderizar a página com as tabelas
    res.render("obra/index", {
      obrasVermelhoHomens,
      obrasVermelhoMulheres,
      obrasVermelhoJovens,
      obrasVermelhoCriancas,
      obrasVermelho,
      obrasVerdeHomens,
      obrasVerdeMulheres,
      obrasVerdeJovens,
      obrasVerdeCriancas,
      obrasVerde,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar as tabelas.");
  }
});

// Rota para renderizar o formulário de cadastro
router.get("/cadastro", (req, res) => {
  res.render("obra/cadastro");
});

// Rota POST para processar o cadastro manual de uma obra
router.post("/cadastro", async (req, res) => {
  try {
    // Captura os dados do formulário
    const { nome, time, grupo } = req.body;

    // Criação de um novo objeto Obra com os dados recebidos
    const obra = new Obra({
      nome: nome,
      time: time,
      grupo: grupo,
    });

    // Salvar a nova obra no banco de dados
    await obra.save();

    // Redireciona o usuário para uma página de sucesso ou a lista de obras
    res.redirect("/obra"); // Ou você pode renderizar uma página de sucesso
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar a obra.");
  }
});

// Rota para exportar obras diretamente como download de CSV
router.get("/exportar", async (req, res) => {
  try {
    // Busca todas as obras no banco de dados
    const obras = await Obra.find();

    if (obras.length === 0) {
      return res.status(404).send("Nenhuma obra encontrada para exportação.");
    }

    // Configuração do cabeçalho e campos do CSV
    const fields = ["nome", "time", "grupo"]; // Campos a serem incluídos no CSV
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(obras);

    // Define cabeçalhos para download do CSV
    res.header("Content-Type", "text/csv");
    res.header("Content-Disposition", "attachment; filename=participantes.csv");

    // Envia o CSV como resposta
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao exportar os dados.");
  }
});

// Rota GET para exibir o formulário de upload de CSV

module.exports = router; // Exporta o router para ser usado no app.js
