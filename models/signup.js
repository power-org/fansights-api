const { Database } = require('../lib');

let signup = {
    account: (payload) => {
        return new Promise((resolve, reject) => {
            let content = {
                name: payload.name,
                password: Database.mysql.raw(`PASSWORD('${payload.password}')`),
                email: payload.email
            };
            Database.execute('INSERT INTO members SET ?', content).then(data=>{
                if(data.affectedRows > 0){
                    resolve(data);
                }else{
                    reject({
                        message: 'No affected rows'
                    });
                }
            }).catch(error=>{
                reject(error);
            });
        });
    }
};

module.exports = signup;