const mongoose = require('mongoose')
const transactionModel = mongoose.model("Transaction")
const config = require('../config/dataBase');

module.exports = {
    async saveTransaction (transaction){
        try {
            return await transaction.save();
        } catch (error) {
            throw error.message;
        };
    },

    async findTransaction (query){
        try {
            console.info("Iniciou consulta das transações: " + JSON.stringify(query));
            return await transactionModel.findOne(query).sort({ 'transactionId': "desc" }).exec();
        } catch (error) {
            throw error.message;
        }
    },

    async find (query, page){
        try {
            console.info("Iniciou consulta conta: " + JSON.stringify(query));
            return await transactionModel.find(query).sort({ 'transactionId': "desc" }).limit(config.limit.items).skip(config.limit.items * page).exec();
        } catch (error) {
            throw error.message;
        }
    },

}