const mongoose = require("mongoose");

const hoje = new Date();

// Formatar diretamente no formato 'dd/MM/yyyy'
const dataDeHoje = hoje.toLocaleDateString("pt-BR");

// Esquema para armazenar membros efetivos
const membroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: false, default: "(19) 999999999" },
  email: { type: String, required: false, default: "nãotem@gmail.com" },
  idade: { type: Number, required: false, default: 0 },
  sexo: { type: String, required: false },
  dataEntrada: { type: String, default: dataDeHoje }, // Data de entrada no grupo de membros
});

// Exporta o modelo
const Membro = mongoose.model("Membro", membroSchema);

module.exports = Membro;
