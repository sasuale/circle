const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createCategory: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO categorias(nome, icon) VALUES (?, ?)",
            [
                data.nome,
                data.icon
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCategories: callBack => {
        mysqlConnection.query(
            "SELECT * FROM categorias WHERE deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getCategoriesByCategoryId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM categorias WHERE id = ? AND deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateCategory: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE categorias SET nome = ?, icon = ?, updated_at = ? WHERE id = ?",
            [data.nome, data.icon, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteCategory: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE categorias SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getCategoriesByCategoryName: (nome, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM categorias WHERE nome LIKE '%?%' AND deleted_at IS NULL",
            [nome],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};