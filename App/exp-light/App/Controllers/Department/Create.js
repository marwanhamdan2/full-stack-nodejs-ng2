var responseBuilder = require('../../Utils/ResponseBuilder');
var departmentService = require('../../Services/Department');

module.exports = function(req, res){
    var inputData = req.body || null;
    if(!inputData || !inputData.name){
        return res.status(500).json(responseBuilder.buildErrorResponse('NO data provided'));
    }else{
        var departmentName = inputData.name;
        departmentService.createDepartment(departmentName)
        .then(response=>{
            return res.json(responseBuilder.buildSuccessResponse({
                newId: response.insertId ? response.insertId: null
            }));
        })
        .catch(err=>{
            return res.status(500).json(responseBuilder.buildErrorResponse(err));
        });
    }
};