const mongoose = require('mongoose');
const countModel = mongoose.model("Count");
const countRepository = require("../repository/count_repository");
const moment = require('moment')

module.exports = {

    async createCount(params){
        try {
            let build = buildCount(params);
            return await countRepository.saveCount(build);
        } catch (error) {
            throw error;
        }
    },

    async findCount(params){
        try {
            let query;

            if(params.cpf)
                query = { cpf : params.cpf };
            else if(params.userId)
                query = { userId: params.userId };
            else 
                query = { };

            return await countRepository.findCount(query);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async findCountBy (params){
        try {
            let query;
            
            if(params.cpf)
                query = { cpf: params.cpf };
            else if( params.userId)
                query = { userId: params.userId };
            else
                query = { };

            let userFound = await countRepository.find(query, params.page);
            if(userFound.length)
                return userFound;
            else
                throw "Nenhum resultado encontrado para sua busca!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};

function buildCount(params){
    let { userId, cpf } = params;

    if(!cpf || !userId){
        throw "Todos os campos são obrigatórios!";
    }

    let count = new countModel({ 
        userId: userId,    
        cpf: cpf,
        numero_Conta: Date.now().toString() + userId.toString(),
        data_criacao: moment().format("YYYY/MM/DD HH:MM:ss"),
    })
    return count;
}