var responseBuilder = require('../../Utils/ResponseBuilder');
var employeeService = require('../../Services/Employee');

module.exports = function(req, res){
    var inputData = req.body || null;
    if(!inputData){
        return res.status(500).json(responseBuilder.buildErrorResponse('missing data'));
    }

    employeeService.updateEmployee(inputData)
    .then(succ=>{
        return res.json(responseBuilder.buildSuccessResponse('updated successfully'));
    })
    .catch(err=>{
        return res.status(500).json(responseBuilder.buildErrorResponse(err));
    });
}