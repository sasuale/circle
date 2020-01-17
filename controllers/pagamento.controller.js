const { createPayment, getPayments, getPaymentByPaymentId, getPaymentByPaymentType, updatePayment, deletePayment } = require("../services/pagamento.service");

module.exports = {
    createPayment: (req, res) => {
        try {
            const body = req.body;
            createPayment(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Pagamento efectuado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao efectuar o pagamento!' });
        }
    },
    getPayments: (req, res) => {
        try{
            getPayments((err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: results
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao buscar todos pagamentos!' });
        }
    },
    getPaymentByPaymentId: (req, res) => {
        try{
            const id = req.params.id;
            getPaymentByPaymentId(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({                        
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                if(!results){
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao buscar este pagamento!' });
        }
    },
    getPaymentByPaymentType: (req, res) => {
        try{
            const tipo = req.params.tipo;
            getPaymentByPaymentType(tipo, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({                        
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                if(!results){
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao buscar este tipo de pagamento!' });
        }
    },
    updatePayment: (req, res) => {
        try{
            const body = req.body;
            updatePayment(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Pagamento editado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editado pagamento!' });
        }
    },
    deletePayment: (req, res) => {
        try{
            const id = req.params.id;
            deletePayment(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Pagamento eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar o pagamento!' });
        }
    }
}