var responseBuilder = require('../../Utils/ResponseBuilder');
var employeeService = require('../../Services/Employee');

module.exports = function(req, res){
    var inputData = req.body || null;
    if(!inputData || !inputData.name || !inputData.gender || !inputData.deptId){
        return res.status(500).json(responseBuilder.buildErrorResponse('NO enough data provided'));
    }else{
        var {name, gender, deptId} = inputData;
        employeeService.createEmployee(name, gender, deptId)
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