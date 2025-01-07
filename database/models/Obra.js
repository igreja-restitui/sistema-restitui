// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const obraSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  time: { type: String, required: true },
});

// Exporta o modelo
const Obra = mongoose.model("Obra", obraSchema);

module.exports = Obra;
