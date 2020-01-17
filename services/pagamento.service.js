const mysqlConnection = require("../config/database");
const date = require('date-and-time');
const now = new Date();
var formato;

module.exports = {
    createPayment: (data, callBack) => {
        mysqlConnection.query(
            "INSERT INTO pagamentos(tipo, observacao, vendedor_id) VALUES (?, ?, ?)",
            [
                data.tipo,
                data.observacao,
                data.vendedor_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPayments: callBack => {
        mysqlConnection.query(
            "SELECT pay.id as id_pagamento, pay.tipo as tipo_pagamento, pay.observacao, pay.vendedor_id, ven.taxa_registo as taxa_registo_vendedor, us.nome as nome_vendedor, us.utilizador, us.email, us.telefone FROM pagamentos pay INNER JOIN vendedores ven ON ven.id = pay.vendedor_id INNER JOIN usuarios us ON us.id = ven.usuario_id WHERE pay.deleted_at IS NULL",
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPaymentByPaymentId: (id, callBack) => {
        mysqlConnection.query(
            "SELECT pay.id as id_pagamento, pay.tipo as tipo_pagamento, pay.observacao, pay.vendedor_id, ven.taxa_registo as taxa_registo_vendedor, us.nome as nome_vendedor, us.utilizador, us.email, us.telefone FROM pagamentos pay INNER JOIN vendedores ven ON ven.id = pay.vendedor_id INNER JOIN usuarios us ON us.id = ven.usuario_id WHERE pay.id = ? AND pay.deleted_at IS NULL",
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getPaymentByPaymentType: (tipo, callBack) => {
        mysqlConnection.query(
            "SELECT pay.id as id_pagamento, pay.tipo as tipo_pagamento, pay.observacao, pay.vendedor_id, ven.taxa_registo as taxa_registo_vendedor, us.nome as nome_vendedor, us.utilizador, us.email, us.telefone FROM pagamentos pay INNER JOIN vendedores ven ON ven.id = pay.vendedor_id INNER JOIN usuarios us ON us.id = ven.usuario_id WHERE pay.tipo = ? AND pay.deleted_at IS NULL",
            [tipo],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updatePayment: (data, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE pagamentos SET tipo = ?, observacao = ?, vendedor_id = ?, updated_at = ? WHERE id = ?",
            [data.tipo, data.observacao, data.vendedor_id, formato, data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    deletePayment: (id, callBack) => {
        formato = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        mysqlConnection.query(
            "UPDATE pagamentos SET deleted_at = ? WHERE id = ?",
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