const express = require("express"); //importa a biblioteca express, responsável por todas as manipulações no banco de dados
const cors = require("cors"); //importa a biblioteca cors, usada para a linkagem entre o backend e o frontend
const rotas = require("./routes");

const app = express(); //define express em uma constante chamada app

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //configuração do express para receber e decodificar requisições do usuário (req.body)
app.use(cors());

app.use(rotas);
app.use("*", (req, res) => {
  //após rodar o app.use(rotas), se uma rota não estiver definida, ele vai vir para essa linha, que captura qualquer rota restante (não definida) e fala que ela não foi encontrada
  res.status(404).json({ message: `Rota '${req.baseUrl}' não encontrada` });
});

module.exports = app;
