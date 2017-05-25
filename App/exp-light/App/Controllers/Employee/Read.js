var responseBuilder = require('../../Utils/ResponseBuilder');
var employeeService = require('../../Services/Employee');

module.exports = function(req, res){
    var deptId = req.params.deptId || null;

    if(!deptId){
        res.json(
            responseBuilder.buildErrorResponse("department id is not provided")
        );
    }else{
        employeeService.fetchDepartmentEmployees(deptId)
        .then((emps)=>{
            res.json(
                responseBuilder.buildSuccessResponse(emps)
            );
        })
        .catch((err)=>{
            res.json(
                responseBuilder.buildErrorResponse(err)
            );
        });
    }
}