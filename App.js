const express = require("express");
const rotas = require("./routes");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true })); //https??
app.use(express.json());
app.use(cors());
app.use(rotas);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Rota '${req.baseUrl}' não encontrada` });
});

module.exports = app;

// app.get("", (req, res) => {
//   return res.json({
//     message: "Padrão",
//   });
// });

// app.get("/cadastro", (req, res) => {
//   return res.json({
//     message: "Cadastro",
//   });
// });
