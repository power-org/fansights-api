const Database = require('./Database')
const S3 = require('./S3Bucket');
const S3DiskStorage = require('./S3DiskStorage');
const API = require('./APIService');

module.exports = {
  Database,
  S3,
  S3DiskStorage,
  API
};
