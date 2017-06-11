require('../../../globalconfig');

exports.saveImage = function(req, res){
    var imageFileName = '';
    if(req.files !== undefined){
        var imageFile = req.files.image;
        imageFileName = req.body.user + '_' + imageFile.name;
        var imageSavePath = userImageUploadPath + imageFileName;
        imageFile.mv(__dirname + imageSavePath, function(err){
            if(err){
                imageSavePath = '';
                console.error(err);
            }else{
                console.log('Image saved as ' + imageFileName);
                console.log('Image saved at '+ __dirname + imageSavePath);
            }
        });
    }
    return imageFileName;
};