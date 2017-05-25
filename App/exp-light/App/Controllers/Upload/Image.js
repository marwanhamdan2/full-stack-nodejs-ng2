const targetUploadDir = `./uploads/`;
const fs = require('fs');
const mv = require('mv');

const OpenCVService = require('../../Services/OpenCV');

module.exports= function(req, res){
    try{
        if(req.files && req.files.length){
            var ref = req.files[0];
            var originalName = ref.originalname;
            var data = new Date().toString().replace(/\s/g,'-');
            var random = Math.floor(Math.random()*1000);
            var fullName = `${data}-${random}-${originalName}`;
            var targetPath = `${targetUploadDir}${fullName}`;

            mv(ref.path, targetPath, (err)=>{
                if(err){
                    return res.status(500).json({
                        status: `failed`
                    })
                }


                OpenCVService.detectImageFaces(targetPath)
                .then(coordinates=>{
                    return res.json({
                        status: 'success',
                        coordinates: coordinates
                    })
                })
                .catch(err=>{
                    return res.status(500).json({
                        status: `failed`,
                        err: err
                    })
                })
                
            })
        }
    }catch(exp){
        return res.status(500).json({
            status: 'failed',
            err: exp
        })
    }
}