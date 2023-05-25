const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
  async create(req, res) {
    const sessao = await SessoesModel.create(req.body);

    return res.status(200).json(sessao);
  }

  async read(req, res) {
    const sessao = await SessoesModel.find().populate('id_usuario', '-senha');

    return res.status(200).json(sessao);
  }

  async delete(req, res) {
    const { id } = req.params;
    await SessoesModel.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ mensagem: "Sessão com id " + id + " deletado com sucesso!" });
  }
}

module.exports = new SessoesController();
