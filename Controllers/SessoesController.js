//explicações detalhadas na UsuarioController
const SessoesModel = require("../Models/SessoesModel");
const UsuarioModel = require("../Models/UsuarioModel");

class SessoesController {
  async create(req, res) {
    try {
      const { id_usuario } = req.body; //pega o suposto id de usuários no body da requisição
      const usuarioEncontrado = await UsuarioModel.findOne({ _id: id_usuario }); // procura por esse id em todos os modelos de usuário

      if (usuarioEncontrado == null)
        //se ele não achar o usuário com id, ou seja, se o encontrado for null, não se pode criar a sessão
        return res.status(404).json({
          message:
            "Usuário com id " +
            id_usuario +
            " não encontrado! Não é possível iniciar a sessão",
        });

      const sessao = await SessoesModel.create(req.body); //se o usuário for encontrado, segue para cá

      res.status(200).json(sessao);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const sessao = await SessoesModel.find().populate("id_usuario", "-senha"); //O populate faz com que as informações do usuário com id id_usuario também sejam mostradas, com excessão da senha

      res.status(200).json(sessao);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params; //faz a mesma validação de usuários no sentido de não tentar apagar uma sessão que não existe
      // ele procura pelo usuário com o id que foi passado nos parâmetros da requisição. Ou seja, da forma que está aqui, ele apaga pelo id do usuário e não da sessão
      const sessaoEncontrada = await SessoesModel.findOne({ id_usuario: id });
      if (!sessaoEncontrada)
        return res.status(404).json({
          message: "Usuário com id " + id + " não encontrado nas sessões!",
        });

      const sessao = await sessaoEncontrada.deleteOne();

      res
        .status(200)
        .json({
          mensagem: "Sessão do usuário com id " + id + " deletado com sucesso!",
        });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new SessoesController();
