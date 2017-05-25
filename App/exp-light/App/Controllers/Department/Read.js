var responseBuilder = require('../../Utils/ResponseBuilder');
var departmentService =  require('../../Services/Department');

module.exports = function(req, res){
    departmentService.readDepartment()
    .then((depts)=>{
        res.json(
            responseBuilder.buildSuccessResponse(depts)
        );
    })
    .catch((err)=>{
        res.json(
            responseBuilder.buildErrorResponse(err)
        )
    });
}