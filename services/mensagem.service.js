const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createMessage: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO mensagens(conteudo, emissor_id, receptor_id) VALUES (?, ?, ?)",
            [
                data.conteudo,
                data.emissor_id,
                data.receptor_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getMessages: callBack => {
        mysqlConnection.query(
            "SELECT sms.id, conteudo, us.id as id_emissor, us.nome as nome_emissor, us.utilizador as utilizador_emissor, us.email as email_emissor, us.telefone as telefone_emissor, us.nivel_id as id_acesso_emissor, niv.nome as tipo_acesso_emissor, usu.id as id_receptor, usu.nome as nome_receptor, usu.utilizador as utilizador_receptor, usu.email as email_receptor, usu.telefone as telefone_receptor, usu.nivel_id as id_acesso_receptor, nive.nome as tipo_acesso_receptor FROM mensagens sms INNER JOIN usuarios us ON us.id = sms.emissor_id INNER JOIN usuarios usu ON usu.id = sms.receptor_id INNER JOIN niveis_acesso niv ON niv.id = us.nivel_id INNER JOIN niveis_acesso nive ON nive.id = usu.nivel_id WHERE sms.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getMessageByEmitterId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT sms.id, conteudo, us.id as id_emissor, us.nome as nome_emissor, us.utilizador as utilizador_emissor, us.email as email_emissor, us.telefone as telefone_emissor, us.nivel_id as id_acesso_emissor, niv.nome as tipo_acesso_emissor, usu.id as id_receptor, usu.nome as nome_receptor, usu.utilizador as utilizador_receptor, usu.email as email_receptor, usu.telefone as telefone_receptor, usu.nivel_id as id_acesso_receptor, nive.nome as tipo_acesso_receptor FROM mensagens sms INNER JOIN usuarios us ON us.id = sms.emissor_id INNER JOIN usuarios usu ON usu.id = sms.receptor_id INNER JOIN niveis_acesso niv ON niv.id = us.nivel_id INNER JOIN niveis_acesso nive ON nive.id = usu.nivel_id WHERE sms.emissor_id = ? AND sms.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateMessage: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE mensagens SET conteudo = ?, emissor_id = ?, receptor_id = ?, updated_at = ? WHERE id = ?",
            [data.conteudo, data.emissor_id, data.receptor_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteMessage: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE mensagens SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};