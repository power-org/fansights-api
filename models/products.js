const { Database } = require('../lib');
const async = require('async');

let products = {
    getProductsByTag: (payload)=>{
        return new Promise((resolve, reject)=>{
            Database.execute(`
            SELECT fd.id, t.name, fd.long_desc FROM food_des fd
            LEFT JOIN fd_group fdg ON fdg.code = fd.group_code
            LEFT JOIN footnote fn ON fn.ndb_no = fd.ndb_no
            LEFT JOIN weight w ON w.ndb_no = fd.ndb_no
            LEFT JOIN tags t ON fd.short_desc regexp t.name
            WHERE t.name IN (?)
            GROUP BY fd.id, t.name, fd.long_desc
            ORDER BY t.name
            `, [payload]).then(data=>{
                var grouped = data.groupBy(function (item) {
                    return [item.name]; 
                });
                resolve(grouped);
            }).catch(error=>{
                reject(error);
            })
        });
    }
};

module.exports = products;