const transaction = require('../controllers/transaction_controller')

module.exports = function(server) {	
	server.post('/transaction/', transaction.saveTransaction)
    server.get('/transaction/:page/:userId?', transaction.findTransaction)
}