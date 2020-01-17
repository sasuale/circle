const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createRolePermission: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO neveis_permissoes(nivel_id, permissao_id) VALUES (?, ?)",
            [
                data.nivel_id,
                data.permissao_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRolesPermissions: callBack => {
        mysqlConnection.query(
            "SELECT na.id as nivel_id, p.id as permissao_id, na.nome as tipo_acesso, p.nome as permissao FROM neveis_permissoes np INNER JOIN niveis_acesso na ON na.id = np.nivel_id INNER JOIN permissoes p ON p.id = np.permissao_id WHERE na.deleted_at IS NULL AND p.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRolesPermissionsByRoleId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT na.id as nivel_id, p.id as permissao_id, na.nome as tipo_acesso, p.nome as permissao FROM neveis_permissoes np INNER JOIN niveis_acesso na ON na.id = np.nivel_id INNER JOIN permissoes p ON p.id = np.permissao_id WHERE na.id = ? AND na.deleted_at IS NULL AND p.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteRolePermission: (data, callBack) => {
        mysqlConnection.query(
            "DELETE FROM neveis_permissoes WHERE nivel_id = ? AND permissao_id = ?",
            [data.n_id, data.p_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};