const { create, getUsers, getUserByUserId, getUserByUserUsername, updateUser, deleteUser, getUserByUserEmail } = require("../services/user.service");
const { bcrypt, genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        try {
            const body = req.body;
            const salt = genSaltSync(10);
            body.senha = hashSync(body.senha, salt);
            create(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Utilizador criado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao criar um novo utilizador!' });
        }
    },
    getUsers: (req, res) => {
        try{
            getUsers((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todos utilizadores!' });
        }
    },
    getUserByUserId: (req, res) => {
        try{
            const id = req.params.id;
            getUserByUserId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar este utilizador!' });
        }
    },
    getUserByUserUsername: (req, res) => {
        try{
            const utilizador = req.params.utilizador;
            getUserByUserUserame(utilizador, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar este utilizador!' });
        }
    },
    updateUser: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            const salt = genSaltSync(10);
            body.senha = hashSync(body.senha, salt);
            updateUser(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Utilizador editado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editado dados do utilizador!' });
        }
    },
    deleteUser: (req, res) => {
        try{
            const id = req.params.id;
            deleteUser(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Utilizado eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar o utilizador!' });
        }
    },
    login : (req, res) => {
        try{
            const body = req.body;
            getUserByUserEmail(body.email, (err, results) => {
                if(err){
                    console.log(err);
                }
                if(!results){
                    return res.json({
                        success: 0,
                        data: "E-mail ou senha inválida!"
                    });
                }
                const result = compareSync(body.senha, results.senha);
                if(result){
                    results.senha = undefined;
                    const jsontoken = sign({result: results}, "M1@2l3a4n576@", {
                        expiresIn: "1h"
                    });
                    return res.json({
                        success: 1,
                        message: "Bem-vindo ao Circle!",
                        token: jsontoken
                    });
                }else{
                    return res.json({
                        success: 0,
                        data: "E-mail ou senha inválida!"
                    });
                }
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na autenticação!' });
        }
    }
}