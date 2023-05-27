/*esse arquivo foi criado para aumentar a modularidade do sistema. No caso do nosso projeto, poderíamos
ter importado o startdb direto no index geral e só inicializado o banco de dados lá.
mas está feito assim para ir de acordo com a capacitação*/
const startDB = require("./mongodb");

//classe Loaders, com uma função que inicializa o banco de dados
class Loaders {
  start() {
    startDB();
  }
}
module.exports = new Loaders(); //exporta a classe para que o loaders seja chamado depois
