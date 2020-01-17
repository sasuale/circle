const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createImage: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO imagens(link, produto_id) VALUES (?, ?)",
            [
                data.link,
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
    getImages: callBack => {
        mysqlConnection.query(
            "SELECT * FROM imagens WHERE deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getImagesByImageId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT * FROM imagens WHERE id = ? AND deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateImage: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE imagens SET link = ?, produto_id = ?, updated_at = ? WHERE id = ?",
            [data.link, data.produto_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteImage: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE imagens SET deleted_at = ? WHERE id = ?",
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