var responseBuilder = require('../../Utils/ResponseBuilder');
var departmentService = require('../../Services/Department');

module.exports = function(req, res){
    var inputData = req.body || null;
    if(!inputData){
        return res.status(500).json(responseBuilder.buildErrorResponse('missing data'));
    }

    departmentService.updateDepartment(inputData)
    .then(succ=>{
        return res.json(responseBuilder.buildSuccessResponse('updated successfully'));
    })
    .catch(err=>{
        return res.status(500).json(responseBuilder.buildErrorResponse(err));
    });
}