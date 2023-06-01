/*Os models são usados para definir a estrutura e o comportamento dos objetos que serão armazenados no banco de dados.
Nesse arquivo, define-se um model de usuário,acessado na url /usuarios, que guarda coisas como nome, email, senha, etc*/
const mongoose = require("mongoose"); //biblioteca mogoose, usada para facilitar a comunicação entre o mongodb e o programador
const bcrypt = require("bcrypt"); //biblioteca bcrypt, usada para encriptar a senha

const Schema = mongoose.Schema; //define uma constante como o operador de "tabela"

const SessoesModel = require("./SessoesModel");

//Define como a tabela de usuário é estruturada
const UsuarioSchema = new Schema({
  email: {
    //o usuário possui um email que deve ser único (não se repete para nenhum outro usuário)
    type: String,
    unique: true, //validação a nível de banco de dados
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
  cor_doodle: String,
});

UsuarioSchema.pre("save", async function (next) {
  //antes de salvar o usuário, roda essa função. Quando acabar de rodar ela, chamamos o next para sairmos da função e salvarmos o usuário
  const usuario = this; //ponteiro do objeto para si mesmo

  if (usuario.isModified("senha")) {
    //quando o campo de senha for modificado por qualquer motivo,
    const salt = await bcrypt.genSalt(); //criamos uma string de caracteres aleatórios para criptografarmos a senha (salt)
    const hash = await bcrypt.hash(usuario.senha, salt); //criptogragamos a senha com essa string feita anteriormente
    usuario.senha = hash; // a senha nova será igual à senha antiga, criptografada
  }
  next();
});

UsuarioSchema.pre(
  //middleware que roda antes de deletar o usuário, que tem a função de deletar sua sessão se ela existir.
  "deleteOne",
  { document: true, query: false },
  async function () {
    const usuario = this;

    return await SessoesModel.deleteOne({ id_usuario: usuario._id }); //não precisa do next pq retorna só uma promise
  }
);

const UsuarioModel = mongoose.model("usuarios", UsuarioSchema); //cria o modelo de acordo com as definições anteriores

module.exports = UsuarioModel;
