const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createProduct: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO produtos(nome, detalhes, preco, limite_compra, vendedor_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?)",
            [
                data.nome,
                data.detalhes,
                data.preco,
                data.limite_compra,
                data.vendedor_id,
                data.categoria_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProducts: callBack => {
        mysqlConnection.query(
            "SELECT p.id as produto_id, p.nome as nome_produto, p.codigo_produto, p.detalhes, p.preco, p.limite_compra, p.vendedor_id, p.categoria_id, p.created_at, p.updated_at, p.deleted_at, ven.taxa_registo, us.id as id_utilizador, us.nome, us.utilizador, us.email, us.telefone, ven.created_at, ven.updated_at, ven.deleted_at, c.nome as nome_categoria, c.icon FROM produtos p INNER JOIN vendedores ven INNER JOIN usuarios us ON us.id = ven.usuario_id INNER JOIN categorias c ON c.id = p.categoria_id WHERE p.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProductsByProductId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT p.id as produto_id, p.nome as nome_produto, p.codigo_produto, p.detalhes, p.preco, p.limite_compra, p.vendedor_id, p.categoria_id, p.created_at, p.updated_at, p.deleted_at, ven.taxa_registo, us.id as id_utilizador, us.nome, us.utilizador, us.email, us.telefone, ven.created_at, ven.updated_at, ven.deleted_at, c.nome as nome_categoria, c.icon FROM produtos p INNER JOIN vendedores ven INNER JOIN usuarios us ON us.id = ven.usuario_id INNER JOIN categorias c ON c.id = p.categoria_id WHERE p.id = ? AND p.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateProduct: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE produtos SET nome = ?, detalhes = ?, preco = ?, limite_compra = ?, vendedor_id = ?, categoria_id = ?, updated_at = ? WHERE id = ?",
            [data.nome, data.detalhes, data.preco, data.limite_compra, data.vendedor_id, data.categoria_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deleteProduct: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE produtos SET deleted_at = ? WHERE id = ?",
            [formato, id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getProductsByProductName: (nome, callBack) => {
        mysqlConnection.query(
            "SELECT p.id as produto_id, p.nome as nome_produto, p.codigo_produto, p.detalhes, p.preco, p.limite_compra, p.vendedor_id, p.categoria_id, p.created_at, p.updated_at, p.deleted_at, ven.taxa_registo, us.id as id_utilizador, us.nome, us.utilizador, us.email, us.telefone, ven.created_at, ven.updated_at, ven.deleted_at, c.nome as nome_categoria, c.icon FROM produtos p INNER JOIN vendedores ven INNER JOIN usuarios us ON us.id = ven.usuario_id INNER JOIN categorias c ON c.id = p.categoria_id WHERE nome LIKE '%?%' AND deleted_at IS NULL",
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