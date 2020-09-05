const count = require('../controllers/count_controller')

module.exports = function(server) {	
	server.post('/createCount/', count.saveCount)
    server.get('/findCount/:page/:cpf?', count.findCount)
}