const userService = require("../service/user_service");
const countService = require("../service/count_service");

exports.saveUser = async function(req, res){
    try {
        let findUser = await userService.findUser(req.body);

        if(!findUser)
            throw "Usuário não encontrado!"
        
        if(findUser.cpf !== req.body.cpf || findUser.userId !== req.body.userId)
            throw "Error! Favor verificar dados!"

        await countService.findCount(req.body)
        let saved = await countService.createCount(req.body);
        return res.status(200).send({message:saved})
    } catch (error) {
        return res.status(500).send({message: error})   
    }
}