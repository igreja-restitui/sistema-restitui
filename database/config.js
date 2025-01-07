const mongoose = require("mongoose");
const password = encodeURIComponent(process.env.DB_PASSWORD);

const connection = async () => {
  const mongoURI = `mongodb+srv://igrejaevangelicarestitui:${password}@sistema-restitui.4xdxg.mongodb.net/banco-restitui`; // Substitua pelo seu URI
  const options = {};

  try {
    await mongoose.connect(mongoURI, options);
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1); // Encerra a aplicação caso não consiga conectar
  }
};

module.exports = connection;
