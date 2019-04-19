const { Database } = require('../lib');

let login = {
    siginIn: (payload) => {
        return new Promise((resolve, reject) => {
            Database.execute('SELECT * FROM members WHERE email = ? AND password=MD5(?)', [payload.email, payload.password]).then(data=>{
                if(data.length > 0){
                    resolve(data[0]);
                }else{
                    reject({
                        message: 'No record found'
                    });
                }
            }).catch(error=>{
                reject(error);
            });
        });
    }
};

module.exports = login;