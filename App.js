const express = require("express"); //importa a biblioteca express, responsável por todas as manipulações no banco de dados
const cors = require("cors");
const rotas = require("./routes");

const app = express(); //define express em uma constante chamada app

app.use(express.urlencoded({ extended: true })); //https??
app.use(express.json());
app.use(cors());
app.use(rotas);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota '${req.baseUrl}' não encontrada` });
});

module.exports = app;
