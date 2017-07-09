require('../../../globalconfig');
var fs = require('fs');

exports.saveImage = function (req, saveImageOnServer) {
    var imageFileName = '';
    if (req.files !== undefined) {
        var imageFile = req.files.image;
        imageFileName = req.body.user + '_' + imageFile.name;
        var imageSavePath = userImageUploadPath + imageFileName;
        if (saveImageOnServer) {
            imageFile.mv(__dirname + imageSavePath, function (err) {
                if (err) {
                    imageSavePath = '';
                    console.error(err);
                }
            })
        };
    }
    return imageFileName;
};

exports.deleteImage = function (imageFileName) {
    var imageSavePath = userImageUploadPath + imageFileName;
    fs.unlink(__dirname + imageSavePath, function(err, res){
        if (err) {
            console.error(err);
        }
    });
};