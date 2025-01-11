const express = require("express");
const Aviso = require("../database/models/Aviso");
const Grupo = require("../database/models/Grupo");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const { DateTime } = require("luxon");
const slugify = require("slugify");

router.get("/aviso", async (req, res) => {
  let msg = req.flash("success");

  try {
    const { slug } = req.query; // Recebe o parâmetro de query string 'grupo'

    // Busca todos os grupos
    const grupos = await Grupo.find();

    // Se o filtro de grupo estiver presente, filtra os avisos daquele grupo
    let avisos;
    if (slug) {
      // Filtra os avisos com base no slug do grupo
      avisos = await Aviso.find({ slug: slug }).sort({ data: 1 });
    } else {
      // Caso contrário, retorna todos os avisos
      avisos = await Aviso.find().sort({ data: 1 });
    }

    // Função para converter a data em formato 'dd/MM/yyyy' para um objeto Date
    const convertToDate = (dataStr) => {
      const [day, month, year] = dataStr.split("/");
      return new Date(`${year}-${month}-${day}`); // Converte para Date
    };

    // Ordena os avisos pela data mais recente
    avisos.sort((a, b) => {
      const dateA = convertToDate(a.dia); // Converte a data de 'dia' para Date
      const dateB = convertToDate(b.dia); // Converte a data de 'dia' para Date

      return dateA - dateB; // Ordena pela data (mais recente primeiro)
    });

    // Renderiza a página com os avisos e grupos
    res.render("aviso/index", { avisos, grupos, grupoSelecionado: slug, msg });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar avisos", error: err });
  }
});

// Rota para
router.get("/aviso/cadastro", async (req, res) => {
  // Busca todos os avisos do banco de dados
  const grupos = await Grupo.find();
  res.render("aviso/cadastro", { grupos });
});

// // Rota POST para
router.post("/aviso/cadastro", async (req, res) => {
  try {
    // Captura os dados do formulário
    const { titulo, descricao, data, grupo } = req.body;

    // Converte a data recebida para o formato desejado (dd/MM/yyyy)
    const formattedDate = DateTime.fromISO(data)
      .setZone("America/Sao_Paulo")
      .toFormat("dd/MM/yyyy");

    // Formata a hora no formato HH:mm:ss
    const formattedTime = DateTime.fromISO(data)
      .setZone("America/Sao_Paulo")
      .toFormat("HH:mm:ss");

    // Criação de um novo objeto Obra com os dados recebidos
    const aviso = new Aviso({
      titulo,
      descricao,
      dia: formattedDate,
      horario: formattedTime,
      grupo,
      slug: slugify(grupo).toLowerCase(),
    });

    // Salvar a nova grupo no banco de dados
    await aviso.save();

    req.flash("success", { msg: "Aviso cadastrado com sucesso" });

    res.redirect("/aviso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o aviso.");
  }
});

module.exports = router;
