const { Router } = require("express");
const UsuarioController = require("./Controllers/UsuarioController");
const SessoesController = require("./Controllers/SessoesController");

const rotas = Router();

//usuarios
rotas.post("/usuarios", UsuarioController.create);
rotas.get("/usuarios", UsuarioController.read);
rotas.delete("/usuarios/:id", UsuarioController.delete);
rotas.put("/usuarios/:id", UsuarioController.update);

//sessoes
rotas.post("/sessoes", SessoesController.create);
rotas.get("/sessoes", SessoesController.read);
rotas.delete("/sessoes/:id", SessoesController.delete);

module.exports = rotas;
