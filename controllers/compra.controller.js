const { createBuy, getShopping, getShoppingByBuyId, updateBuy, deleteBuy } = require("../services/compra.service");

module.exports = {
    createBuy: (req, res) => {
        try {
            const body = req.body;
            createBuy(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Compra efectuada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao efectuar a compra!' });
        }
    },
    getShopping: (req, res) => {
        try{
            getShopping((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todas compras!' });
        }
    },
    getShoppingByBuyId: (req, res) => {
        try{
            const id = req.params.id;
            getShoppingByBuyId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar essa compra!' });
        }
    },
    updateBuy: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updateBuy(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação da compra feita com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados da compra!' });
        }
    },
    deleteBuy: (req, res) => {
        try{
            const id = req.params.id;
            deleteBuy(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Compra eliminada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar a compra!' });
        }
    }
}