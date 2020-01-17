const { createCategory, getCategories, getCategoriesByCategoryId, updateCategory, deleteCategory, getCategoriesByCategoryName } = require("../services/categoria.service");

module.exports = {
    createCategory: (req, res) => {
        try {
            const body = req.body;
            createCategory(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Categoria criada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na criação da categoria!' });
        }
    },
    getCategories: (req, res) => {
        try{
            getCategories((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todas categorias!' });
        }
    },
    getCategoriesByCategoryId: (req, res) => {
        try{
            const id = req.params.id;
            getCategoriesByCategoryId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar essa categoria!' });
        }
    },
    updateCategory: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updateCategory(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação da categoria feita com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados da categoria!' });
        }
    },
    deleteCategory: (req, res) => {
        try{
            const id = req.params.id;
            deleteCategory(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Categoria eliminada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar a categoria!' });
        }
    },
    getCategoriesByCategoryName: (req, res) => {
        try{
            const nome = req.params.nome;
            getCategoriesByCategoryName(nome, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar essa categoria!' });
        }
    }
}