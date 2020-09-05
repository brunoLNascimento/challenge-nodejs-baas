const mongoose = require('mongoose');
const userRepository = require("../repository/user_repository");
const userModel = mongoose.model("User");

module.exports = {
    
    async findUser (params){
        try {
            let query;

            if(params.cpf)
               query = { cpf : params.cpf };
            else 
               query = { userId : parseInt(params.userId) , ativo: true };

            let userFound = await userRepository.findUser(query);
            console.log(userFound);
            return userFound;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findUserBy (params){
        try {
            let query;
            
            if(params.userId)
                query = { userId : parseInt(params.userId) , ativo: true };
            else if(params.userName)
                query = { nome : { $regex : `.*${ params.userName }.*`, $options:  "si"} , ativo: true };
            else
                query = { ativo: true };

            let userFound = await userRepository.find(query, params.page);
            if(userFound.length)
                return userFound;
            else
                throw "Nenhum resultado encontrado para sua busca!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findInactiveUser (params){
        try {
            let query;
            
            if(params.userId)
                query = { userId : params.userId, ativo: false };
            else
                query = { ativo: false };

            let userFound = await userRepository.find(query, params.page);
            if(userFound.length)
                return userFound;
            else
                throw "Nenhum resultado encontrado para sua busca!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async activeUser (params, user){
        try {
            if(parseInt(params.cpf) !== user.cpf)
                throw "Favor verificar o CPF do usúario";
            
            let query = { userId: params.userId, ativo: true };
            let userFound = await userRepository.activeUser(query);
            if(userFound.ativo)
                return "Usuário ativado com sucesso!";
            else
                throw "Nenhum resultado encontrado para sua busca!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    
    async saveUser (params){
        try {
            let build = buildUser(params);
            return await userRepository.saveUser(build);
        } catch (error) {
            throw error;
        }
    },

    async deleteUser (userId){
        try {
            let query = {userId : parseInt(userId), ativo: false };
            let deleted = await userRepository.deleteUser(query);
            if(!deleted.ativo)
                return "Usuário deletado com sucesso";
            else
                throw "Erro ao deletar usuário";

        } catch (error) {
            throw error;
        }
    }
}


function buildUser(params){
    let { nome, cpf, email, estado_civil, endereco, uf, cidade, telefone, complemento, profissao, rendimentos, nome_empresa } = params;

    if(!nome || !cpf || !email || !estado_civil || !endereco || !uf || !cidade || !telefone || !profissao || !rendimentos){
        throw "Todos os campos são obrigatórios!";
    }

    let user = new userModel({ 
        nome: nome,
        cpf: cpf,
        email: email,
        estado_civil: estado_civil,
        endereco: endereco,
        uf: uf,
        cidade: cidade,
        telefone: telefone,
        complemento: complemento,
        profissao: profissao,
        rendimentos: rendimentos,
        nome_empresa:  nome_empresa
    })
    
    return user;
}