const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, "M1@2l3a4n576@", (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Token inválido!"
                    });
                }else{
                    next();
                }
            });
        }else{
            res.json({
                success: 0,
                message: "Acesso negado, utilizador não autenticado!"
            });
        }
    }
}