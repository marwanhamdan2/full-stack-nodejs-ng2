var responseBuilder = require('../../Utils/ResponseBuilder');
var UserService = require('../../Services/User');


module.exports = function(req, res){
    var token  = req.headers.token;

    if(!token){
        return res.status(500).json(responseBuilder.buildErrorResponse('token is not provided'));
    }else{
        UserService.getUserDataFromToken(token)
        .then(userData=>{
            return res.status(200).json(responseBuilder.buildSuccessResponse({
                userData
            }));
        })
        .catch(err=>{
            return res.status(500).json(responseBuilder.buildErrorResponse({
                error: err
            }))
        })
    }
};