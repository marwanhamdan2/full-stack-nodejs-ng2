var pem  = require('pem');

module.exports = {
    createCertificate: function(){
        return new Promise((resolve, reject)=>{
            pem.createCertificate({days:10, selfSigned:true}, (err, keys)=>{
                if(err){
                    return reject(err);
                }
                return resolve({
                    key : keys.serviceKey,
                    cert: keys.certificate
                })
            });
        })
    }
}