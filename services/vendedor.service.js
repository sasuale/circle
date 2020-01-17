const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createSeller: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO vendedores(taxa_registo, usuario_id) VALUES (?, ?)",
            [
                data.taxa_registo,
                data.usuario_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSellers: callBack => {
        mysqlConnection.query(
            "SELECT ven.id as id_venda, ven.taxa_registo, us.id as id_utilizador, us.nome, us.utilizador, us.email, us.telefone, ven.created_at, ven.updated_at, ven.deleted_at FROM vendedores ven INNER JOIN usuarios us ON us.id = ven.usuario_id WHERE ven.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getSellersBySellerId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT ven.id as id_vendedor, ven.taxa_registo, us.id as id_utilizador, us.nome, us.utilizador, us.email, us.telefone, ven.created_at, ven.updated_at, ven.deleted_at FROM vendedores ven INNER JOIN usuarios us ON us.id = ven.usuario_id WHERE ven.id = ? AND ven.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateSeller: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE vendedores SET taxa_registo = ?, usuario_id = ?, updated_at = ? WHERE id = ?",
            [data.taxa_registo, data.usuario_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteSeller: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE vendedores SET deleted_at = ? WHERE id = ?",
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