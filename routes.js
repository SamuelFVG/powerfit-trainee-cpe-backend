/*usamos o rotas para mapear o nosso app (express()). Assim, rodamos todas as validações e fazemos as operações sempre que o usuário faz uma reuquisição ao
para cada requisição, fazemos a validação por meio do validator e depois a operação, caso a requisição seja válida
portanto, chamamdos o validator e depois o controller*/
const { Router } = require("express");

const SessoesController = require("./Controllers/SessoesController");
const SessoesValidator = require("./Validators/SessoesValidator");
const UsuarioController = require("./Controllers/UsuarioController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const verificarJwt = require("./Middlewares/verificarJwt");

const rotas = Router();

//usuarios
rotas.post("/usuarios", UsuarioValidator.create, UsuarioController.create);
rotas.get("/usuarios", verificarJwt, UsuarioController.read);
rotas.delete(
  verificarJwt,
  "/usuarios/:id",
  UsuarioValidator.destroy,
  UsuarioController.destroy
);
rotas.put(
  "/usuarios/:id",
  verificarJwt,
  UsuarioValidator.update,
  UsuarioController.update
);

//sessoes
rotas.post(
  "/sessoes",
  verificarJwt,
  SessoesValidator.create,
  SessoesController.create
);
rotas.get("/sessoes", verificarJwt, SessoesController.read);
rotas.delete(
  verificarJwt,
  "/sessoes/:id",
  SessoesValidator.destroy,
  SessoesController.destroy
);

//auth
rotas.post("/login", AuthValidator.login, AuthController.login);

module.exports = rotas;
