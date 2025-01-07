const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const obraController = require("./controllers/obraController");

//banco de dados
const connection = require("./database/config");
connection();

//view engine
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

//icon

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/obra", obraController);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contatos", (req, res) => {
  res.render("contatos");
});

app.listen(port, () => console.log(`Serrvidor rodando na porta: ${port}`));
