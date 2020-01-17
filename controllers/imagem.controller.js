const { createImage, getImages, getImagesByImageId, updateImage, deleteImage } = require("../services/imagem.service");

module.exports = {
    createImage: (req, res) => {
        try {
            const body = req.body;
            createImage(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Imagem criada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na criação da imagem!' });
        }
    },
    getImages: (req, res) => {
        try{
            getImages((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todas imagens!' });
        }
    },
    getImagesByImageId: (req, res) => {
        try{
            const id = req.params.id;
            getImagesByImageId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar essa imagem!' });
        }
    },
    updateImage: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updateImage(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação da imagem feita com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados da imagem!' });
        }
    },
    deleteImage: (req, res) => {
        try{
            const id = req.params.id;
            deleteImage(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Imagem eliminada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar a imagem!' });
        }
    }
}