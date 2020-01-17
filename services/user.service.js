const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    create: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO usuarios(nome, utilizador, email, telefone, senha, nivel_id) VALUES (?, ?, ?, ?, ?, ?)",
            [
                data.nome,
                data.utilizador,
                data.email,
                data.telefone, 
                data.senha, 
                data.nivel_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        mysqlConnection.query(
            "SELECT us.id as id_usuario, us.nome, utilizador, email, telefone, senha, niv.id as id_nivel, niv.nome as tipo_acesso, us.created_at, us.updated_at, us.deleted_at FROM usuarios us INNER JOIN niveis_acesso niv ON niv.id = us.nivel_id WHERE us.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT us.id as id_usuario, us.nome, utilizador, email, telefone, senha, niv.id as id_nivel, niv.nome as tipo_acesso, us.created_at, us.updated_at, us.deleted_at FROM usuarios us INNER JOIN niveis_acesso niv ON niv.id = us.nivel_id WHERE us.id = ? AND us.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserUsername: (utilizador, callBack) => {
        var t = "?";
        mysqlConnection.query(
            "SELECT us.id as id_usuario, us.nome, utilizador, email, telefone, senha, niv.id as id_nivel, niv.nome as tipo_acesso, us.created_at, us.updated_at, us.deleted_at FROM usuarios us INNER JOIN niveis_acesso niv ON niv.id = us.nivel_id WHERE us.nome LIKE '%"+t+"%' AND us.deleted_at IS NULL",
            [utilizador],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE usuarios SET nome = ?, utilizador = ?, email = ?, telefone = ?, senha = ?, nivel_id = ?, updated_at = ? WHERE id = ?",
            [data.nome, data.utilizador, data.email, data.telefone, data.senha, data.nivel_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteUser: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE usuarios SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM usuarios WHERE email = ? OR utilizador = ?",
            [email, email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};