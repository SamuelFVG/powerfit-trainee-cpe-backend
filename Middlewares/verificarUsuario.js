function verificarUsuario (req, res, next){

    console.log({ usuarioId: req.usuarioId});
    next();
}

module.exports = verificarUsuario;