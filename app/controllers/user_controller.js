const service = require("../service/user_service")


exports.saveUser = async function(req, res){
    try {
        console.log("foi1")
        let findUser = service.findUser()
        console.log(findUser)
        return res.send(findUser)
    } catch (error) {
        return res.send(error)   
    }
}