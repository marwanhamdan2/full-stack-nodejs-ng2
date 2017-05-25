var responseBuilder = require('../../Utils/ResponseBuilder');
var UserService = require('../../Services/User');

module.exports = function(req, res){
    var inputData = req.body || null;
    if(!inputData || !inputData.username || !inputData.password){
        return res.status(500).json(responseBuilder.buildErrorResponse({
                error: `NO enough data provided`
        }))
    }else{
        var {username, password} = inputData;        

        UserService.createUser(username, password)
        .then(userId=>{
            return res.status(200).json(responseBuilder.buildSuccessResponse({
                userId
            }));
        })
        .catch(err=>{
            return res.status(500).json(responseBuilder.buildErrorResponse({
                error: err
            }))
        })
    }
};