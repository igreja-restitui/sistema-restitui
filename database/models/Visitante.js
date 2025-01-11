// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const visitanteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: false },
  qtdCultos: { type: Number, required: true, default: 1 },
});

// Exporta o modelo
const Visitante = mongoose.model("Visitante", visitanteSchema);

module.exports = Visitante;
