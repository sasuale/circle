const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createBuy: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO compras(telefone_comprador, produto_id) VALUES (?, ?)",
            [
                data.telefone_comprador,
                data.produto_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShopping: callBack => {
        mysqlConnection.query(
            "SELECT * FROM compras WHERE deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getShoppingByBuyId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM compras WHERE id = ? AND deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateBuy: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE compras SET telefone_comprador = ?, produto_id = ?, updated_at = ? WHERE id = ?",
            [data.telefone_comprador, data.produto_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteBuy: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE compras SET deleted_at = ? WHERE id = ?",
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