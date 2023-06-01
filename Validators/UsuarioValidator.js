/*Os validators são funções que verificam se os dados recebidos na requisição são válidas e estão corretas.
eles devem ser chamados antes de qualquer função do CRUD realmente acontecer.*/

const { z } = require("zod");
const { validateRequest } = require("zod-express-middleware");
const { default: mongoose } = require("mongoose");

const create = validateRequest({
  //função de validação de criação do usuário
  body: z.object({
    //o body deve ser validado. Ele é um objeto
    nome: z.string({ required_error: "O nome é obrigatório" }), //verifica se o nome é uma string e se ele está presente. Em falha de qualquer um dos casos, retorna um erro
    email: z
      .string({ required_error: "O email é obrigatório" })
      .email({ required_error: "Email inválido" }), //verifica se o email está presente, se é uma string e se é um email realmente
    senha: z.string({ required_error: "A senha é obrigatória" }),
    cargo: z.string({ required_error: "O cargo é obrigatório" }),
  }),
});

const destroy = validateRequest({
  params: z.object({
    id: z.custom(mongoose.isValidObjectId, "O ID não é válido"), //se o id não for válido, ele manda a mensagem.
  }),
});

const update = validateRequest({
  //precisamos validar tanto o body quanto o params, já que recebemos dados dos dois
  body: z.object({
    nome: z.string().optional(), //o .optional() possibilita que o usuário não precise de enviar todas as informações só para editar uma delas
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
