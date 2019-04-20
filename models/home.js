const { Database } = require('../lib');
const async = require('async');
/**
SELECT * FROM food_des fd
LEFT JOIN fd_group fdg ON fdg.code = fd.group_code
LEFT JOIN footnote fn ON fn.ndb_no = fd.ndb_no
LEFT JOIN weight w ON w.ndb_no = fd.ndb_no
WHERE short_desc regexp 'banana'
ORDER BY fd.ndb_no
 */

let home = {
    getProfileDetails: (user) => {
        return new Promise((resolve, reject) => {
            Database.execute('SELECT * FROM members WHERE id = ?', user.id).then(data=>{
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
    },
    createHeavyMeal: (payload)=>{
        return new Promise((resolve, reject)=>{

        });
    }
};

module.exports = home;