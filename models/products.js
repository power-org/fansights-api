const { Database } = require("../lib");
const async = require("async");

let products = {
  getProductsByTag: payload => {
    return new Promise((resolve, reject) => {
      Database.execute(
        `
        SELECT fd.id, fd.ndb_no, t.name, fd.long_desc FROM food_des fd
        LEFT JOIN tags t ON fd.short_desc regexp t.name
        LEFT JOIN nut_data nd ON nd.ndb_no = fd.ndb_no
        WHERE t.name IN (?) AND nd.ndb_no is not null AND nd.nutr_no IN(208,268,203,204,205,291)
        GROUP BY fd.id, fd.ndb_no, t.name, fd.long_desc
        ORDER BY t.name
        `,
        [payload]
      )
        .then(data => {
          let grouped = data.groupBy(function(item) {
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
          }],
        },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result.getDetails);
          }
        }
      );
    });
  }
};

module.exports = products;
