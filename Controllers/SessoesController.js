const SessoesModel = require("../Models/SessoesModel");

/*TODO:
Ver como não criar a sessão se o ID não existir nos usuários
*/
class SessoesController {
  async create(req, res) {
    try {
      const sessao = await SessoesModel.create(req.body);

      res.status(200).json(sessao);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const sessao = await SessoesModel.find().populate("id_usuario", "-senha");

      return res.status(200).json(sessao);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const sessaoEncontrada = await SessoesModel.findById(id);
      if (!sessaoEncontrada)
        return res
          .status(404)
          .json({ message: "Sessão com id " + id + " não encontrada!" });

      const sessao = await sessaoEncontrada.deleteOne();

      res
        .status(200)
        .json({ mensagem: "Sessão com id " + id + " deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new SessoesController();
