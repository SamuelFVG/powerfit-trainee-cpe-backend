/*Os models são usados para definir a estrutura e o comportamento dos objetos que serão armazenados no banco de dados.
Nesse arquivo, define-se um model de usuário,acessado na url /usuarios, que guarda coisas como nome, email, senha, etc*/
const mongoose = require("mongoose"); //biblioteca mogoose, usada para facilitar a comunicação entre o mongodb e o programador
const bcrypt = require("bcrypt"); //biblioteca bcrypt, usada para encriptar a senha

const Schema = mongoose.Schema; //define uma constante como o operador de "tabela"

//Define como a tabela de usuário é estruturada
const UsuarioSchema = new Schema({
  email: {
    //o usuário possui um email que deve ser único (não se repete para nenhum outro usuário)
    type: String,
    unique: true,
  },
  nome: {
    //o nome também deve ser único
    type: String,
    unique: true,
  },
  senha: {
    //a senha não pode ser recebida em nenhuma requisição, então fazemos select: false
    type: String,
    select: false,
  },
  cargo: String, //não há limitações para o cargo ou para a atividade
  atividade: String,
});

UsuarioSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("senha")) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.senha, salt);
    user.senha = hash;
    // console.log({ salt, hash });
  }

  next();
});

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema); //cria o modelo de acordo com as definições anteriores

module.exports = UsuarioModel;
