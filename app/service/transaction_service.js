const mongoose = require('mongoose');
const transactionModel = mongoose.model("Transaction");
const transactionRepository = require("../repository/transaction_repository");
const moment = require('moment')

module.exports = {

    async findTransaction (params){
        try {
            let query = { userId: params.userId };
            return await transactionRepository.findTransaction(query);
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async createTransaction(params, dadostransaction){
        try {
            let transaction = buildTransaction(params, dadostransaction);
            return await transactionRepository.saveTransaction(transaction);
        } catch (error) {
            throw error.message ? error.message : error;
        }
    },

    async transaction(params){
        try {
            let query;

            if(params.userId)
                query = { userId : params.userId };
            else 
                query = { };

            return await transactionRepository.find(query, params.page);;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}

function buildTransaction(params, valorAnterior){
    if(valorAnterior)
        if(params.userId !== parseInt(valorAnterior.userId))
            throw "Error! Verifique os dados!";
    
    let somaValorAnterior = valorAnterior ? valorAnterior.valor_total : 0;
    let valorTotal = { };

    if(params.valorDepositado)
        valorTotal = valorAnterior ? parseFloat(valorAnterior.valor_total + params.valorDepositado) : params.valorDepositado; 
    else if(valorAnterior && params.valorSaque)
        if(valorAnterior.valor_total >= params.valorSaque)
            valorTotal = parseFloat(valorAnterior.valor_total - params.valorSaque);
        else    
            throw `Valor solicitado para saque: ${params.valorSaque} maior que o valor atual: ${valorAnterior.valor_total} na conta!` 
    else
        throw "Usuário não tem valor para fazer o saque!"
    
    let paramTransaction = new transactionModel({ 
        userId: params.userId,    
        data_transacao: moment().utc(0300).format("YYYY/MM/DD HH:mm:ss"),
        valor_anterior: somaValorAnterior,
        valor_depositado: params.valorDepositado,
        valor_saque: params.valorSaque,
        valor_total: valorTotal 
    })

    return paramTransaction;
}