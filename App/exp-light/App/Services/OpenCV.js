const openCV = require('opencv');


module.exports = {
    detectImageFaces: function(imagePath){
        return new Promise((resolve, reject)=>{
            openCV.readImage(imagePath, function(err, im){
                if (err){
                    return reject(err);
                }
                if (im.width() < 1 || im.height() < 1){
                    return reject(('Image has no size'));
                }

                im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces){
                    if (err){
                        return reject(err);
                    }

                    return resolve(faces);
                        /*
                    for (var i = 0; i < faces.length; i++){
                    var face = faces[i];
                    im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2, [255, 255, 0], 3);
                    }

                    im.save('./img/face-detection.jpg');
                    console.log('Image saved.');
                    */
                });
            });
        });
    }
}