const mongoose = require('mongoose')
const userModel = mongoose.model("Count")
const config = require('../config/dataBase')


module.exports = {
    async saveCount (countUser){
        try {
            console.info("Criando conta para usuário: " + JSON.stringify(countUser));
            return await countUser.save();
        } catch (error) {
            throw error.message;
        };
    },
    async findCount (query){
        try {
            console.info("Iniciou consulta por conta: " + JSON.stringify(query));
            return await userModel.findOne(query).exec();
        } catch (error) {
            throw error.message;
        }
    }
}