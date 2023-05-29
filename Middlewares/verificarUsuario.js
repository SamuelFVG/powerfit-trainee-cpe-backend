function verificarUsuario (req, res, next){
    const usuarioId = req.params.id || req.params.id_usuario || req.body.id;

    if (req.usuarioId !== usuarioId)
        return res.status(401).json({ message: "Operação não permitida" });

    next();
}

module.exports = verificarUsuario;