const mongoose = require('mongoose')
const transactionModel = mongoose.model("Transaction")
const config = require('../config/dataBase');

module.exports = {
    async saveTransaction (trans){
        try {
         //   console.info("Criando conta para usuário: " + JSON.stringify(transaction));
            return await trans.save();
        } catch (error) {
            throw error.message;
        };
    },

    async findTransaction (query){
        try {
            console.info("Iniciou consulta das transações: " + JSON.stringify(query));
            return await transactionModel.findOne(query).exec();
        } catch (error) {
            throw error.message;
        }
    },

    async find (query, page){
        try {
            console.info("Iniciou consulta conta: " + JSON.stringify(query));
            return await userModel.find(query).limit(config.limit.items).skip(config.limit.items * page).exec();
        } catch (error) {
            throw error.message;
        }
    },

}