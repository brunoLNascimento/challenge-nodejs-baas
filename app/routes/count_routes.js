const count = require('../controllers/count_controller')

module.exports = function(server) {	
	server.post('/createCount/', count.saveUser)
	// server.delete('/deleteUser/:userId', count.deleteUser)
	// server.get('/findUserId/:page/:userId', count.findUser)
	// server.get('/findUserName/:page/:userName?', count.findUser)
	// server.get('/findInactive/:page/:userId?', count.findInactiveUser)
	// server.patch('/activeUser/:userId/:cpf', count.activeUser)




}