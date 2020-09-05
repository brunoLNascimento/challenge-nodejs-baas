const service = require("../service/user_service")


exports.saveUser = async function(req, res){
    try {
        let findUser = await service.findUser(req.body);

        if(findUser)
            if(!findUser.ativo)
                throw "Usuário já possui cadastro, favor reativar conta!";
            else if(findUser) 
                throw "Error! Usuário já cadastrado!";
        
        let saved = await service.saveUser(req.body);
        return res.status(200).send(saved)
    } catch (error) {
        return res.status(500).send(error)   
    }
}

exports.deleteUser = async function(req, res){
    try {
        let findUser = await service.findUser(req.params);

        if(!findUser) 
            throw "Não foi possível excluir, usuário não encontrado!";
       
        let deleted = await service.deleteUser(req.params.userId);
        return res.status(200).send(deleted);
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.findUser = async function(req, res){
    try {
        let findBy = req.params;
        let findUser = await service.findUserBy(findBy);
        return res.status(200).send(findUser);
    } catch (error) {
        return res.status(500).send(error);
    }
}