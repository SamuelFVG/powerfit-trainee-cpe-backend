const mongoose = require("mongoose");

//função que inicializa o banco de dados
async function startDB() {
  await mongoose.connect(process.env.MONGO_URI); //pegando a URL em .env para o login no banco de dados
  console.log("Banco de dados inicializado");
}

module.exports = startDB;
