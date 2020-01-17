const { createSeller, getSellers, getSellersBySellerId, updateSeller, deleteSeller } = require("../services/vendedor.service");

module.exports = {
    createSeller: (req, res) => {
        try {
            const body = req.body;
            createSeller(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Vendedor cirado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao criar vendedor!' });
        }
    },
    getSellers: (req, res) => {
        try{
            getSellers((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todos vendedores!' });
        }
    },
    getSellersBySellerId: (req, res) => {
        try{
            const id = req.params.id;
            getSellersBySellerId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar este vendedor!' });
        }
    },
    updateSeller: (req, res) => {
        try{
            const body = req.body;
            updateSeller(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Vendedor editado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editado dados do vendedor!' });
        }
    },
    deleteSeller: (req, res) => {
        try{
            const id = req.params.id;
            deleteSeller(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Vendedor eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar o vendedor!' });
        }
    }
}