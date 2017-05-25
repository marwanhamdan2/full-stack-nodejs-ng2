var responseBuilder = require('../../Utils/ResponseBuilder');
var departmentService = require('../../Services/Department');

module.exports = function(req, res){
    var id = req.params.id || null;
    if(!id){
        return res.status(500).json(responseBuilder.buildErrorResponse('id is not provided'));
    }

    departmentService.deleteDepartment(id)
    .then(succ=>{
        return res.json(responseBuilder.buildSuccessResponse('deleted successfully'));
    })
    .catch(err=>{
        return res.status.json(responseBuilder.buildErrorResponse(err));
    });
}