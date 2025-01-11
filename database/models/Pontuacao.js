// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const pontuacaoSchema = new mongoose.Schema({
  time: { type: String, required: true, unique: true },
  pontos: { type: Number, default: 0 },
});

// Exporta o modelo
const Pontuacao = mongoose.model("Pontuacao", pontuacaoSchema);

module.exports = Pontuacao;
