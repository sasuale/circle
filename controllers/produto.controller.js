const { createProduct, getProducts, getProductsByProductId, updateProduct, deleteProduct, getProductsByProductName } = require("../services/produto.service");

module.exports = {
    createProduct: (req, res) => {
        try {
            const body = req.body;
            createProduct(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Produto criado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na criação do produto!' });
        }
    },
    getProducts: (req, res) => {
        try{
            getProducts((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todas produtos!' });
        }
    },
    getProductsByProductId: (req, res) => {
        try{
            const id = req.params.id;
            getProductsByProductId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar esse produto!' });
        }
    },
    updateProduct: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updateProduct(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação do produto feita com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados do produto!' });
        }
    },
    deleteProduct: (req, res) => {
        try{
            const id = req.params.id;
            deleteProduct(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Produto eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar o produto!' });
        }
    },
    getProductsByProductName: (req, res) => {
        try{
            const nome = req.params.nome;
            getProductsByProductName(nome, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar esse produto!' });
        }
    }
}