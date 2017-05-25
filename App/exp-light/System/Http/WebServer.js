var enviroment = require('../Enviroment/enviromentManager');
var http  = require('http')
var https =  require('https');

var sslService = require('../ssl/service');
module.exports = {
    initHttpServer: function(app){
        return new Promise((resolve, reject)=>{
            var server = http.createServer(app);
            server.listen(enviroment.WEB_SERVER_PORT, ()=>{
                var address = server.address().address;
                var port = server.address().port;
                console.log("serving at => " + address + ":" + port);
                return resolve(server);
            });
        });
    },

    initHttpsServer: function(app){
        sslService.createCertificate()
        .then(keys=>{

            var server = https.createServer({
                key: keys.key, cert: keys.cert
            }, app);

            server.listen(enviroment.WEB_HTTPS_SERVER_PORT, ()=>{
                console.log(`https listens to ${enviroment.WEB_HTTPS_SERVER_PORT}@${server.address().address}`);
            })
        })
        .catch(err=>{
            console.log(`error in createing ssl certificate: `, err);
        })
    }
}