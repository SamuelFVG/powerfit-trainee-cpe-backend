function verificarUsuario(req, res, next) {
  const usuarioId = req.params.id || req.body.id_usuario || req.body._id;
  if (req.usuarioId !== usuarioId)
    return res.status(401).json({ message: "Operação não permitida" });

  next();
}

module.exports = verificarUsuario;
