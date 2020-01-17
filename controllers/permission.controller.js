const { createPermission, getPermissions, getPermissionByPermissionId, updatePermission, deletePermission, getPermissionByPermissionName } = require("../services/permission.service");

module.exports = {
    createPermission: (req, res) => {
        try {
            const body = req.body;
            createPermission(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Permissão criada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na criação de permissão!' });
        }
    },
    getPermissions: (req, res) => {
        try{
            getPermissions((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todas permissões!' });
        }
    },
    getPermissionByPermissionId: (req, res) => {
        try{
            const id = req.params.id;
            getPermissionByPermissionId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar uma permissão!' });
        }
    },
    updatePermission: (req, res) => {
        try{
            const body = req.body;
            body.id = req.params.id;
            updatePermission(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Editação da permissão feita com suceso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao editar os dados da permissão!' });
        }
    },
    deletePermission: (req, res) => {
        try{
            const id = req.params.id;
            deletePermission(id, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Nenhum resultado encontrado!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Permissão eliminada com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao eliminar a permissão!' });
        }
    },
    getPermissionByPermissionName: (req, res) => {
        try{
            const nome = req.params.nome;
            getPermissionByPermissionName(nome, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar uma permissão!' });
        }
    }
}