// models/Obra.js
const mongoose = require("mongoose");

// Esquema para armazenar frases
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "lider" },
});

// Exporta o modelo
const User = mongoose.model("User", userSchema);

module.exports = User;
