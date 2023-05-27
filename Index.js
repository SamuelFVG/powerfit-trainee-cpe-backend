const dotenv = require("dotenv"); //biblioteca que trabalha com variáveis de ambiente, que não vão para o repositório no github por questões de segurança
const app = require("./App");
const Loaders = require("./Loaders/index"); // o loaders é importado aqui para que o banco de dados seja inicializado. A explicação disso ter sido feito dessa forma está no index da pasta loaders

dotenv.config(); //configura o dotenv de acordo com as informações no arquivo .env. Nota-se que esse arquivo deve estar no gitignore
Loaders.start(); //inicializa o banco de dados

app.listen(process.env.PORT || 8000, () => console.log("Servidor Rodando")); //essa chamada inicializa o servidor e faz com ele escute na porta especificada no .env, ou na 8000, por requisições http
