/*O usuário deve tentar fazer o login e, se as informações estiverem corretas, receber um token jwt
o token é basicamente uma combinação das informações do usuário e é usado para que o cliente consiga
realizar operações que necessitam de autenticação */
const UsuarioModel = require("../Models/UsuarioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body; //pega o email e a senha do body
      //se o email for encontrado, continua a execução. Pegamos a senha também para fazermos a validação de senha
      const usuarioEncontrado = await UsuarioModel.findOne({ email }).select(
        "+senha"
      );
      if (!usuarioEncontrado)
        return res.status(403).json({ message: "Email ou senha inválidos" }); //email inválido
      //se a senha digitada (não o hash) foi equivalente ao hash (senha criptografada), continua
      const ehCorrrespondente = await bcrypt.compare(
        senha,
        usuarioEncontrado.senha
      );
      if (!ehCorrrespondente)
        return res.status(403).json({ message: "Email ou senha inválidos" }); //senha inválida

      //se tanto a senha quanto o email forem válidos
      const { senha: senhaCriptografada, ...usuarioSemSenha } =
        usuarioEncontrado.toObject(); //retira a senha do objeto para a criação do token

        console.log(usuarioSemSenha);
      const token = jwt.sign(
        { usuarioSemSenha },
        process.env.JWT_SECRET, //chave secreta que verifica a autenticidade do token
        { expiresIn: process.env.JWT_EXPIRE_IN } //tempo de expiração do token
      );

      res.status(200).json({ token }); //retorna o token
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}
module.exports = new AuthController();
