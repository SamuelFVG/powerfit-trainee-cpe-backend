//explicações do funcionamento detalhadas estão no usuariovalitador
const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  body: z.object({
    id_usuario: z.custom(
      //verifica se o id do USUARIO é inválido
      mongoose.isValidObjectId,
      "O id da sessão não é valido"
    ),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O id da sessão não é valido"),
  }),
});

module.exports = {
  create,
  destroy,
};
