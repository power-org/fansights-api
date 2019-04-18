const { Database } = require('../lib');

let login = {
    siginIn: (payload) => {
        return Promise((resolve, reject) => {
            Database.execute('SELECT * FROM members WHERE email = ? AND password=PASSWORD(?)', payload).then(data=>{
                if(data.length > 0){
                    resolve(data[0]);
                }else{
                    reject([]);
                }
            }).catch(error=>{
                reject(error);
            });
        });
    }
};

module.exports = login;