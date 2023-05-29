/*O middlewarejwt tem a função de verificar se o token criado no AuthController (token de login) 
é válido. ELe atua antes dos validators e dos controllers*/
const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {
  //o header é uma parte da requisição que possui o token. A parte do token pode vir no Authorization ou no authorization, de acordo com a vontade do programador
  //portanto, a linha abaixo pega a parte de autorização do header independente de como ele é feito (||)
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader)
    //se o header não vier,
    return res
      .status(403)
      .json({ message: "Header de autorização não encontrado!" }); //forbidden

  const [bearer, token] = authHeader.split(" "); //o header de autorização vem na forma Bearer + string de token

  if (!/^Bearer$/.test(bearer))
    //se estiver escrito bearer no header de autorização,
    return res
      .status(403)
      .json({ message: "Header de autorização mal formatado!" });

  if (!token)
    //se o token estiver presente
    return res.status(403).json({ message: "O token não está presente!" });

  jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
    if (erro) return res.status(403).json({ message: "O token é inválido" });

    req.usuarioId = usuario.usuarioSemSenha._id;
    
    next();
  });
}

module.exports = verificarJwt;
