const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  email: String,
  nome: String,
  senha: String,
  cargo: String,
  atividade: String,
});
const UsuarioModel = mongoose.model("usuarios", UsuarioSchema);

module.exports = UsuarioModel;
