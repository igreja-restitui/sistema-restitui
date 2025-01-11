// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const grupoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  slug: { type: String, required: true },
});

// Exporta o modelo
const Grupo = mongoose.model("Grupo", grupoSchema);

module.exports = Grupo;
