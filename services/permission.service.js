const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createPermission: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO permissoes(nome) VALUES (?)",
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
    getPermissions: callBack => {
        mysqlConnection.query(
            "SELECT id, nome FROM permissoes WHERE deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPermissionByPermissionId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT id, nome FROM permissoes WHERE id = ? AND deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updatePermission: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE permissoes SET nome = ?, updated_at = ? WHERE id = ?",
            [data.nome, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deletePermission: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE permissoes SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getPermissionByPermissionName: (nome, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM permissoes WHERE nome LIKE '%?%' AND deleted_at IS NULL",
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