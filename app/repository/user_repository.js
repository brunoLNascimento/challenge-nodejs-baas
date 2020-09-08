const mongoose = require('mongoose')
const userModel = mongoose.model("User")
const countModel = mongoose.model("Count")
const transactionModel = mongoose.model("Transaction")
const config = require('../config/dataBase')
mongoose.set('debug', true);

module.exports = {
    
   async findUser (query){
        try {
            console.info("Iniciou consulta por usuário: " + JSON.stringify(query));
            return await userModel.findOne(query).exec();
        } catch (error) {
            throw error.message;
        }
    },

    async find (query, page){
        try {
            console.info("Iniciou consulta por usuário: " + JSON.stringify(query));
            return await userModel.find(query).limit(config.limit.items).skip(config.limit.items * page).exec();
        } catch (error) {
            throw error.message;
        }
    },

    async saveUser (saveUser){
        try {
            console.info("Salvando usuário: " + JSON.stringify(saveUser));
            return await saveUser.save();
        } catch (error) {
            throw error.message;
        }
    },

    async deleteUser (query){
        try {
            console.info("Deletando usuário: " + JSON.stringify(query));
            return await userModel.findOneAndUpdate({userId: query.userId},query, {new: true}).exec();
        } catch (error) {
            throw error.message
        }
    },

    async activeUser (query){
        try {
            console.info("Ativando usuário: " + JSON.stringify(query));
            return await userModel.findOneAndUpdate({userId: query.userId},query, {new: true}).exec();
        } catch (error) {
            throw error.message;
        }
    },

    async findDetails(query){
        try {
            let detail = {};
            detail.user = await userModel.find(query).exec()
            detail.count = await countModel.find(query).exec()
            detail.transaction = await transactionModel.find(query).exec()
            return  detail
        } catch (error) {
            throw error.message
        }
    }


}