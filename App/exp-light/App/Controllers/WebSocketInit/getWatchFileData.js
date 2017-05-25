const Enviroment = require('../../../System/Enviroment/enviromentManager');
const ResponseBuilder = require('../../Utils/ResponseBuilder');

module.exports = function(req, res){
    watchFilePath = Enviroment.WATCH_FILE;
    if(!watchFilePath){
        return res.status(500).json(ResponseBuilder.buildErrorResponse(`No Watch File is set`));
    }

    var options = {
        root : `${__dirname}/../../../`
    };
    res.sendFile(watchFilePath, options);
}