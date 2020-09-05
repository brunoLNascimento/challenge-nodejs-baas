const user = require('../controllers/user_controller')

module.exports = function(server) {	
	server.post('/saveUser/', user.saveUser)
	server.delete('/deleteUser/:userId', user.deleteUser)
	server.get('/findUserId/:page/:userId', user.findUser)
	server.get('/findUserName/:page/:userName?', user.findUser)



}