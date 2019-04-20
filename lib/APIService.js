// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"

const request = require('request');

const azure_config = {
    key: process.env.AZURE_SERVICE_KEY,
    url: process.env.AZURE_URL,
};

const options = {
    uri : azure_config.url,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': azure_config.key
    }
};

exports.setContentType = function(type){
    options.headers["Content-Type"] = type;
}

exports.setAccept = function(type){
    options.headers["Accept"] = type;
}

exports.setPath = function(path, override){
    if(override){
        options.url = path;
    }else{
        options.url = base_url + path;
    }
};

exports.setAuth = function(auth){
    options.headers.Authorization = "Basic " + auth;
};

exports.setBearerAuth = function(auth){
    options.headers.Authorization = "Bearer " + auth;
};

exports.getOptions = function(){
    return options;
};

function parseBody(body){
    if(typeof body == 'undefined') return body;
    if(body == "") return body;
    if(Object.prototype.toString.call(body) == '[object Array]'){
        return body;
    }else if(Object.prototype.toString.call(body) == '[object Object]'){
        return body;
    }else if(Object.prototype.toString.call(body) == '[object String]'){
        try {
            return JSON.parse(body);
        }catch(e){
            return {
                error: e
            }
        }
    }else{
        return {};
    }
}

function deepSearch(data, property, value){
    for(let key in data){
        if(Object.prototype.toString.call(data[key]) == '[object Array]'){
            deepSearch(data[key], property, value);
        }else if(Object.prototype.toString.call(data[key]) == '[object Object]'){
            deepSearch(data[key], property, value);
        }else{
            if(key === property){
                data[key] = data[key].toString().replace(value, '');
            }
        }
    }
    return data;
}

exports.post = function(data){
    options.qs = {
        'visualFeatures': 'Categories,Description,Color,ImageType,Objects,Brands,Faces,Tags,Adult',
        'details': '',
        'language': 'en'
    };
    options.body = data;
    return new Promise((resolve, reject) => {
        request.post(options, function(err, response, body){
            if(!err){
                console.log('POST SUCCESS : ', JSON.stringify(JSON.parse(body), null, '  '));
                resolve({
                    response: response,
                    body: parseBody(body)
                });
            }else{
                console.log('POST ERROR : ', err);
                reject({
                    error: err,
                    response: response
                });
            }
        });
    });
};


exports.postForm = function(data){
    options.qs = {
        'visualFeatures': 'Categories,Description,Color,ImageType,Objects,Brands,Faces,Tags,Adult',
        'details': '',
        'language': 'en'
    };
    delete options.headers["Content-Type"];
    options.formData = {
        file: data
    };
    return new Promise((resolve, reject) => {
        request.post(options, function(err, response, body){
            if(!err){
                console.log('POST SUCCESS : ', JSON.stringify(JSON.parse(body), null, '  '));
                resolve({
                    body: parseBody(body)
                });
            }else{
                console.log('POST ERROR : ', err);
                reject({
                    error: err,
                    response: response
                });
            }
        });
    });
};


exports.get = function(){
    return new Promise((resolve, reject) => {
        request.get(options, function(err, response, body){
            if(!err){
                resolve({
                    response: response,
                    body: parseBody(body)
                });
            }else{
                reject({
                    error: err,
                    response: response
                });
            }
        });
    });
};

exports.put = function(data){
    options.json = true;
    options.body = data;
    return new Promise((resolve, reject) => {
        request.put(options, function(err, response, body){
            if(!err){
                resolve({
                    response: response,
                    body: parseBody(body)
                });
            }else{
                reject({
                    error: err,
                    response: response
                });
            }
        });
    });
};

exports.delete = function(){
    return new Promise((resolve, reject) => {
        request.delete(options, function(err, response, body){
            if(!err){
                resolve({
                    response: response,
                    body: parseBody(body)
                });
            }else{
                reject({
                    error: err,
                    response: response
                });
            }
        });
    });
};