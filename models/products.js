const { Database } = require("../lib");
const async = require("async");

let products = {
  getProductsByTag: payload => {
    return new Promise((resolve, reject) => {
      Database.execute(
        `
            SELECT fd.id, t.name, fd.long_desc FROM food_des fd
            LEFT JOIN fd_group fdg ON fdg.code = fd.group_code
            LEFT JOIN footnote fn ON fn.ndb_no = fd.ndb_no
            LEFT JOIN weight w ON w.ndb_no = fd.ndb_no
            LEFT JOIN tags t ON fd.short_desc regexp t.name
            WHERE t.name IN (?)
            GROUP BY fd.id, t.name, fd.long_desc
            ORDER BY t.name
            `,
        [payload]
      )
        .then(data => {
          var grouped = data.groupBy(function(item) {
            return [item.name];
          });
          resolve(grouped);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  save: payload => {
    return new Promise((resolve, reject) => {
      async.auto({
          master: function(callback) {
            Database.execute(`INSERT INTO meal_master SET ?`, payload[0]).then(data=>{
              if(data.affectedRows > 0){
                callback(null, data.insertId);
              }else{
                callback({
                  error: "Failed to insert data."
                })
              }
            }).catch(error=>{
              callback(error)
            });
          },
          details: ["master", function(result, callback) {
            let queries = [];
            let params = payload[1].map(e=>{
              queries.push(`INSERT INTO meal_details SET ?;`);
              e.mm_id = result.master;  //master id
              if(e.tag instanceof Array) e.tag = e.tag.join(',');
              return e;
            });
            Database.execute(queries.join(''), params).then(data=>{
              callback(null, data);
            }).catch(error=>{
              callback(error)
            });
          }]
        },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve({
              master: result.master,
              details: result.details
            });
          }
        }
      );
    });
  }
};

module.exports = products;
