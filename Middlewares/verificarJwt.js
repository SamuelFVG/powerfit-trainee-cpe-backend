const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader)
    return res
      .status(403)
      .json({ message: "Header de autorização não encontrado!" }); //forbidden

  const [bearer, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(bearer))
    return res
      .status(403)
      .json({ message: "Header de autorização mal formatado!" });

  if (!token)
    return res.status(403).json({ message: "O token não está presente!" });

  jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
    if (erro) return res.status(403).json({ message: "O token é inválido" });

    req.usuarioId = usuario._id;
    next();
  });
}

module.exports = verificarJwt;
