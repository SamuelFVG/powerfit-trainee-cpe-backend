/*Controllers são as classes que realmente fazem as funções do backend. Elas devem importar o model de sua respectiva schema, para fazer modificações nela
As funções são simplificadas por CRUD: C->create->POST, R->read->GET, U->update->PUT, D->delete->DELETE
No contexto do nosso código, o trycatch tem a função de pegar os erros de usuários duplicados e coisas do tipo (definidos no unique: true) e retornar um erro ao invés de fazer as operações*/
const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    //cria o usuário de acordo com as coisas escritas no body. O ID é criado automaticamente. Não deve criar se algum campo unique for repetido
    try {
      const usuario = await UsuarioModel.create(req.body);

      const { senha, ...usuarioSemSenha } = usuario.toObject(); //retorna o usuário criado SEM a senha. Motivos de segurança, já que o select não funciona nesse caso
      res.status(200).json(usuarioSemSenha); //faz uma resposta com código 200 (OK), enviando o usuário sem a senha
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message }); //se der algum erro, ele manda uma resposta com código 500 (ERROR) e escreve o erro
    }
  }

  async read(req, res) {
    //Retorna todos os usuários no sistema
    try {
      const usuario = await UsuarioModel.find();

      res.status(200).json(usuario); //retorna todos os usuários (findOne retornaria só um)
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message }); //tendo o nosso código como base, o trycatch é meio inútil. Mas é bom ter ele para evitar crashes no sistema
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params; //pega o ID no header da requisição
      const usuarioEncontrado = await UsuarioModel.findById(id); //proocura pelo ID
      if (!usuarioEncontrado)
        //se o id estiver no DB, ele continua e muda os seus dados. Senão, ele fala que o usuário não existe, com o código 404 (NOT FOUND)
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });

      const usuario = await usuarioEncontrado.set(req.body).save();
      res.status(200).json(usuario); //retorna o usuário modificado
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const usuarioEncontrado = await UsuarioModel.findById(id);
      if (!usuarioEncontrado)
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });

      const usuario = await usuarioEncontrado.deleteOne(); //deleta somente o usuário encontrado (deleteOne)

      res
        .status(200)
        .json({ mensagem: "Usuário com id " + id + " deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new UsuarioController();

// "email": "exemplo@tes.com",
// "nome": "mickey mouse",
// "senha": "12345",
// "cargo": "testador",
// "atividade": "testar",
