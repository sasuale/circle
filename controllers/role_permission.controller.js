const { createRolePermission, getRolesPermissions, getRolesPermissionsByRoleId, deleteRolePermission } = require("../services/role_permission.service");

module.exports = {
    createRolePermission: (req, res) => {
        try {
            const body = req.body;
            createRolePermission(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Falha na conexão com a base de dados!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Nível de acesso associado à Permissão com sucesso!"
                });
            });
        } catch (err) {
            return res.status(400).send({ error: 'Falha na associação de nível de acesso à permissão!' });
        }
    },
    getRolesPermissions: (req, res) => {
        try{
            getRolesPermissions((err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar todos níveis de acesso associados às permissões!' });
        }
    },
    getRolesPermissionsByRoleId: (req, res) => {
        try{
            const id = req.params.id;
            getRolesPermissionsByRoleId(id, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao buscar um nível de acesso associado às permissões!' });
        }
    },
    deleteRolePermission: (req, res) => {
        try{
            const body = req.body;
            body.n_id = req.params.n_id;
            body.p_id = req.params.p_id;
            deleteRolePermission(body, (err, results) => {
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
            return res.status(400).send({ error: 'Falha ao eliminar o nível de acesso associados às permissões!' });
        }
    }
}