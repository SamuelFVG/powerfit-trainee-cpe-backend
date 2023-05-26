const UsuarioModel = require("../Models/UsuarioModel");

class UsuarioController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({message: "ERRO", error: error.message})
    }
  }

  async read(req, res) {
    try {
      const usuario = await UsuarioModel.find();

      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({message: "ERRO", error: error.message})
    }
    
  }

  async update(req, res) {
    try {
      const { id } = req.params;

    const usuario = await UsuarioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(usuario);
      
    } catch (error) {
      res.status(500).json({message: "ERRO", error: error.message})
    }
    
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
    await UsuarioModel.findByIdAndDelete(id);

    res
      .status(200)
      .json({ mensagem: "Usuário com id " + id + " deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({message: "ERRO", error: error.message})
    }
  }
}

module.exports = new UsuarioController();
