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
        
        UserService.fetchUserData(username, password)
        .then(userData=>{

            var data = {
                userId : userData.id,
                username: userData.username,
                isAdmin: userData.is_admin
            };

            return Promise.resolve(data);
        })
        .then(tokenData=>{
            var token = UserService.createToken(tokenData);
            return res.status(200).json(responseBuilder.buildSuccessResponse({
                token
            }));
        })
        .catch(err=>{
            return res.status(500).json(responseBuilder.buildErrorResponse({
                error: err
            }))
        })
    }
};