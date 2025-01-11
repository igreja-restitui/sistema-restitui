const mongoose = require("mongoose");

const escalaSchema = new mongoose.Schema({
  grupo: { type: String, required: true }, // Nome ou identificador do grupo
  slug: { type: String, required: true }, // Slug gerado a partir do nome do grupo
  terca: { type: String }, // Indica o grupo na escala de terça-feira
  quinta: { type: String }, // Indica o grupo na escala de quinta-feira
  sabadoManha: { type: String }, // Escala no sabado pela manhã
  sabadoNoite: { type: String }, // Escala no sabado à noite
  domingoManha: { type: String }, // Escala no domingo pela manhã
  domingoNoite: { type: String }, // Escala no domingo à noite
  data: { type: String, required: true }, // Data no formato dd/MM/yyyy
});

const Escala = mongoose.model("Escala", escalaSchema);

module.exports = Escala;
