var responseBuilder = require('../../Utils/ResponseBuilder');
var employeeService = require('../../Services/Employee');

module.exports = function(req, res){
    var id = req.params.empId || null;
    if(!id){
        return res.status(500).json(responseBuilder.buildErrorResponse('id is not provided'));
    }

    employeeService.deleteEmployee(id)
    .then(succ=>{
        return res.json(responseBuilder.buildSuccessResponse('deleted successfully'));
    })
    .catch(err=>{
        return res.status.json(responseBuilder.buildErrorResponse(err));
    });
}
