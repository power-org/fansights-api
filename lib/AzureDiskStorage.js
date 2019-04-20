const fs = require('fs');
const path = require('path');

const uuid4 = require('uuid/v4');
const API = require('./APIService');

function getDestination(req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.')+1);
    file.keyname = `${uuid4()}.${ext}`;
    cb(null, path.join(__dirname, `../Upload/${file.keyname}`));
}

function AzureDiskStorage(opts) {
    this.getDestination = (opts.destination || getDestination);
}

AzureDiskStorage.prototype._handleFile = function _handleFile(req, file, cb) {
    this.getDestination(req, file, function (err, path) {
        if (err) return cb(err)
        const outStream = fs.createWriteStream(path);
        file.stream.pipe(outStream);
        outStream.on('error', cb);
        outStream.on('finish', function () {
            let obj = fs.readFileSync(path);
            API.postForm(obj).then(data=>{
                fs.unlinkSync(path);
                cb(null, data);
            }).catch(error=>{
                cb(error);
            })
        });
    });
}

AzureDiskStorage.prototype._removeFile = function _removeFile(req, file, cb) {
    fs.unlink(file.path, cb)
}

module.exports = function (opts) {
    return new AzureDiskStorage(opts)
};
