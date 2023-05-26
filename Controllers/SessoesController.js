const SessoesModel = require("../Models/SessoesModel");

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

      await SessoesModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ mensagem: "Sessão com id " + id + " deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new SessoesController();
