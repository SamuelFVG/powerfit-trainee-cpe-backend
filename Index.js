const dotenv = require("dotenv");
const app = require("./App");
const Loaders = require("./Loaders/index"); // o loaders é importado aqui para que o banco de dados seja inicializado. A explicação disso ter sido feito dessa forma está no index da pasta loaders

dotenv.config();
Loaders.start(); //inicializa o banco de dados

app.listen(process.env.PORT || 8000, () => console.log("Servidor Rodando")); //essa chamada inicializa o servidor e faz com ele escute na porta especificada no .env, ou na 8000, por requisições http
