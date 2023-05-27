const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const usuario = await UsuarioModel.find();

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const usuarioEncontrado = await UsuarioModel.findById(id);
      if (!usuarioEncontrado)
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });

      const usuario = await usuarioEncontrado.set(req.body).save();
      // const usuario = await UsuarioModel.findByIdAndUpdate(id, req.body, {
      //   new: true,
      // });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const usuarioEncontrado = await UsuarioModel.findById(id);
      if (!usuarioEncontrado)
        return res
          .status(404)
          .json({ message: "Usuário com id " + id + " não encontrado!" });

      const usuario = await usuarioEncontrado.deleteOne();

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
