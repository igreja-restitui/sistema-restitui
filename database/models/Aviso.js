// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const avisoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  dia: { type: String, required: true },
  horario: { type: String, required: true },
  grupo: { type: String, required: true },
  slug: { type: String, required: true },
});

// Exporta o modelo
const Aviso = mongoose.model("Aviso", avisoSchema);

module.exports = Aviso;
