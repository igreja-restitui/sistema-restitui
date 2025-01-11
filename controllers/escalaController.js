const express = require("express");
const Grupo = require("../database/models/Grupo");
const Escala = require("../database/models/Escala");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const { DateTime } = require("luxon");
const slugify = require("slugify");

router.get("/", async (req, res) => {
  try {
    const { slug } = req.query; // Recebe o parâmetro de query string 'slug'

    // Busca todos os grupos
    const grupos = await Grupo.find();

    // Se o filtro de grupo estiver presente, filtra as escalas daquele grupo
    let escalas;
    if (slug) {
      // Filtra as escalas com base no slug do grupo
      escalas = await Escala.find({ slug: slug }).sort({ data: 1 }); // Ordena por data crescente
    } else {
      // Caso contrário, retorna todas as escalas
      escalas = await Escala.find().sort({ data: 1 }); // Ordena por data crescente
    }

    // Função para converter a data no formato 'dd/MM/yyyy' para um objeto Date
    const convertToDate = (dataStr) => {
      const [day, month, year] = dataStr.split("/"); // Formato dd/MM/yyyy
      return new Date(`${year}-${month}-${day}`); // Converte para Date
    };

    // Ordena as escalas pela data (caso o filtro não tenha sido aplicado)
    escalas.sort((a, b) => {
      const dateA = convertToDate(a.data); // Converte a data de 'data' para Date
      const dateB = convertToDate(b.data); // Converte a data de 'data' para Date

      return dateA - dateB; // Ordena pela data (mais recente primeiro)
    });

    // Renderiza a página com as escalas e grupos
    res.render("escala/index", {
      escalas,
      grupos,
      grupoSelecionado: slug,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar escalas", error: err });
  }
});

router.get("/cadastro", async (req, res) => {
  const grupos = await Grupo.find();

  res.render("escala/cadastro", { grupos });
});

router.post("/cadastro", async (req, res) => {
  try {
    const {
      grupo,
      data,
      terca,
      quinta,
      sabadoManha,
      sabadoNoite,
      domingoManha,
      domingoNoite,
    } = req.body;

    // Validações básicas
    if (!grupo || !data) {
      return res.status(400).send("Grupo e data são obrigatórios.");
    }

    // Converte a data recebida para o formato dd/MM/yyyy
    const formattedDate = DateTime.fromISO(data)
      .setZone("America/Sao_Paulo")
      .toFormat("dd/MM/yyyy");

    // Cria o objeto escala
    const novaEscala = new Escala({
      grupo,
      slug: slugify(grupo).toLowerCase(),
      data: formattedDate,
      terca: terca || "Não Há",
      quinta: quinta || "Não Há",
      sabadoManha: sabadoManha || "Não Há",
      sabadoNoite: sabadoNoite || "Não Há",
      domingoManha: domingoManha || "Não Há",
      domingoNoite: domingoNoite || "Não Há",
    });

    // Salva no banco de dados
    await novaEscala.save();

    res.redirect("/escala");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar a escala.");
  }
});

module.exports = router;
