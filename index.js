const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

//CONTROLLERS
const obraController = require("./controllers/obraController");
const userController = require("./controllers/userController");
const grupoController = require("./controllers/grupoController");
const avisoController = require("./controllers/avisoController");
const visitanteController = require("./controllers/visitanteController");
const membroController = require("./controllers/membroController");
const escalaController = require("./controllers/escalaController");

//MIDDLEWARES
const verifyUser = require("./middlewares/verifyUser");

//banco de dados
const connection = require("./database/config");
connection();

//view engine
app.set("view engine", "ejs");

//static
app.use(express.static("public"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para ler cookies
app.use(cookieParser());

// Middleware para usuarios
app.use(verifyUser);

//SESSION
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

//FLASH
app.use(flash());

//ROTAS
app.use("/obra", obraController);
app.use("/user", userController);
app.use("/grupo", grupoController);
app.use("/", avisoController);
app.use("/visitante", visitanteController);
app.use("/membro", membroController);
app.use("/escala", escalaController);

//ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.render("index");
});

//ROTA CONTATOS
app.get("/contatos", (req, res) => {
  res.render("contatos");
});

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
