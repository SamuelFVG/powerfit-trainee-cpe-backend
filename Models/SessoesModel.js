//explicações iniciais estão no UsuarioModel
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessoesSchema = new Schema(
  {
    id_usuario: {
      //o id do usuário deve ser único, e deve vir da schema de usuários
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      unique: true,
    },
  },
  {
    timestamps: true, //guarda a data de criação e retorna no json
  }
);

const SessoesModel = mongoose.model("sessoes", SessoesSchema);

module.exports = SessoesModel;
