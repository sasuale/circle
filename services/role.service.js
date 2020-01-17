const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createRole: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO niveis_acesso(nome) VALUES (?)",
            [
                data.nome
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRoles: callBack => {
        mysqlConnection.query(
            "SELECT * FROM niveis_acesso WHERE deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRoleByRoleId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM niveis_acesso WHERE id = ? AND deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateRole: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE niveis_acesso SET nome = ?, updated_at = ? WHERE id = ?",
            [data.nome, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteRole: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE niveis_acesso SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getRoleByRoleName: (nome, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM niveis_acesso WHERE nome LIKE '%?%' AND deleted_at IS NULL",
            [nome],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};