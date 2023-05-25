const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const mongoose = require("mongoose");

// {
//     "_id": "646ec10d19ee335861bbc4d7",
//     "email": "maromba_noPain_noGain@whey.com",
//     "nome": "Joaquin QuinQuin",
//     "senha": "brlll070707",
//     "cargo": "Cliente",
//     "atividade": "Levantando 400kg no bench",
//     "__v": 0
// }

const create = validateRequest({
  body: z.object({
    nome: z.string({ required_error: "O nome é obrigatório" }),
    email: z
      .string({ required_error: "O email é obrigatório" })
      .email({ required_error: "Email inválido" }),
    senha: z.string({ required_error: "A senha é obrigatória" }),
    cargo: z.string({ required_error: "O cargo é obrigatório" }),
    atividade: z.string({ required_error: "A atividade é obrigatória" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

const update = validateRequest({
  body: z.object({
    nome: z.string().optional(),
    email: z.string().email("O email é inválido").optional(),
    senha: z.string().optional(),
    cargo: z.string().optional(),
    atividade: z.string().optional(),
  }),

  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"),
  }),
});

module.exports = {
  create,
  destroy,
  update,
};
