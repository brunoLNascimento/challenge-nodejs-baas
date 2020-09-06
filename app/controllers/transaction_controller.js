const transactionService = require("../service/transaction_service");

exports.saveTransaction = async function(req, res){
    try {
        let transaction = await transactionService.findTransaction(req.body);
        let saved = await transactionService.createTransaction(req.body, transaction);
        return res.status(200).send({message:saved});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}

exports.findTransaction = async function(req, res){
    try {
        let findBy = req.params;
        let transaction = await transactionService.transaction(req.body);
        return res.status(200).send({message: transaction});
    } catch (error) {
        return res.status(500).send({message: error});
    }
}