const { createRole, getRoles, getRoleByRoleId, updateRole, deleteRole, getRoleByRoleName } = require("../services/role.service");

module.exports = {
    createRole: (req, res) => {
        try {
            const body = req.body;
            createRole(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Nível de acesso criado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na criação de nível de acesso!' });
        }
    },
    getRoles: (req, res) => {
        try{
            getRoles((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todos níveis de acesso!' });
        }
    },
    getRoleByRoleId: (req, res) => {
        try{
            const id = req.params.id;
            getRoleByRoleId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar um nível de acesso!' });
        }
    },
    updateRole: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updateRole(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação do nível de acesso feita com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados do nível de acesso!' });
        }
    },
    deleteRole: (req, res) => {
        try{
            const id = req.params.id;
            deleteRole(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Nível de acesso eliminado com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar o nível de acesso!' });
        }
    },
    getRoleByRoleName: (req, res) => {
        try{
            const nome = req.params.nome;
            getRoleByRoleName(nome, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar um nível de acesso!' });
        }
    }
}