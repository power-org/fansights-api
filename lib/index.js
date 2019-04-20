const Database = require('./Database')
const S3 = require('./S3Bucket');
const S3DiskStorage = require('./S3DiskStorage');
const AzureDiskStorage = require('./AzureDiskStorage');
const API = require('./APIService');

// full url: http://foodb.ca/system/foods/pictures/208/full/208.png?1334914139
// thumb url: http://foodb.ca/system/foods/pictures/208/thumb/208.png?1334914139

module.exports = {
  Database,
  S3,
  S3DiskStorage,
  AzureDiskStorage,
  API
};
