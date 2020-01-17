const { createMessage, getMessages, getMessageByEmitterId, updateMessage, deleteMessage } = require("../services/mensagem.service");

module.exports = {
    createMessage: (req, res) => {
        try {
            const body = req.body;
            createMessage(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Mensagem enviada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao enviar mensagem!' });
        }
    },
    getMessages: (req, res) => {
        try{
            getMessages((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todos mensagens!' });
        }
    },
    getMessageByEmitterId: (req, res) => {
        try{
            const id = req.params.id;
            getMessageByEmitterId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar esta mensagem!' });
        }
    },
    updateMessage: (req, res) => {
        try{
            const body = req.body;
            updateMessage(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Mensagem editado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editado mensagem!' });
        }
    },
    deleteMessage: (req, res) => {
        try{
            const id = req.params.id;
            deleteMessage(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Mensagem eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar a mensagem!' });
        }
    }
}