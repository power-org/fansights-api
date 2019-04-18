const AWS = require('aws-sdk');
const fs = require('fs');

const aws_bucket = process.env.AWS_S3_BUCKET;
const aws_region = process.env.AWS_S3_REGION;
const aws_version = process.env.AWS_S3_VERSION;

AWS.config.update({
  region: aws_region,
  accessKeyId: process.env.AWS_S3_ID,
  secretAccessKey: process.env.AWS_S3_KEY,
});

let uploads = {
  uploadPhoto: (file, path)=>{
      let objectParams = {Bucket: aws_bucket, Key: file.keyname, Body: fs.readFileSync(path), ACL: 'public-read'};
      let awsUpload = new AWS.S3({apiVersion: aws_version}).upload(objectParams).promise();
      fs.unlinkSync(path);
      return awsUpload;
  },
  deletePhoto: (file)=>{
    let objectParams = {Bucket: aws_bucket, Key: file.keyname};
    let awsDelete = new AWS.S3({apiVersion: aws_version}).deleteObject(objectParams).promise();
    return awsDelete;
  }
};


module.exports = uploads;