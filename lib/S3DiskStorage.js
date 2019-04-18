const fs = require('fs');
const path = require('path');

const S3 = require('./S3Bucket');
const uuid4 = require('uuid/v4');

function getDestination(req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.')+1);
    file.keyname = `${uuid4()}.${ext}`;
    cb(null, path.join(__dirname, `../Upload/${file.keyname}`));
}

function S3DiskStorage(opts) {
    this.getDestination = (opts.destination || getDestination);
}

S3DiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    this.getDestination(req, file, function (err, path) {
        if (err) return cb(err)

        const outStream = fs.createWriteStream(path);
        file.stream.pipe(outStream);
        outStream.on('error', cb);
        outStream.on('finish', function () {
            S3.uploadPhoto(file, path).then(awsResult=>{
                cb(null, {
                    path: path,
                    size: outStream.bytesWritten,
                    aws: awsResult
                })
            }).catch(awsError=>{
                cb(awsError);
            });
        });
    });
}

S3DiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    S3.deletePhoto(file).then(awsResult=>{
        cb(null, {
            file: file,
            path: path,
            aws: awsResult
        })
    }).catch(awsError=>{
        cb(awsError);
    });
}

module.exports = function (opts) {
    return new S3DiskStorage(opts)
};
