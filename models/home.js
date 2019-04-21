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
        async.auto({
          getProfile: function(callback){
            Database.execute('SELECT * FROM members WHERE id = ?', user.id).then(data=>{
                if(data.length > 0){
                    callback(null, data[0]);
                }else{
                    callback({
                        message: 'No record found'
                    });
                }
            }).catch(error=>{
              callback(error);
            });
          },
          getMeals: ['getProfile', function(result, callback){
            Database.execute(`SELECT * FROM meal_master WHERE member_id = ? ORDER BY date_created`, result.getProfile.id).then(data=>{
              callback(null, data);
            }).catch(error=>{
              callback(error)
            });
          }]
        }, function(err, result){
          if(err){
            reject(err);
          }else{
            let profile = result.getProfile._deleteProps('password');
            profile.meals = result.getMeals;
            resolve(profile);
          }
        });
      });
    },
    getMealDetails: (meal_id)=>{
      return new Promise((resolve, reject) => {
        Database.execute(`
        SELECT
          md.id,
          md.tag,
          md.mm_id,
          fd.id as products_id, fd.ndb_no, fd.long_desc,
          nd.nutr_val,
          nrd.units,
          nrd.tagname,
          nrd.nutr_desc,
          nrd.num_dec,
          nrd.sr_order
        FROM meal_details md
        LEFT JOIN food_des fd ON fd.id = md.products_id
        LEFT JOIN fd_group fdg ON fdg.code = fd.group_code
        LEFT JOIN nut_data nd ON nd.ndb_no = fd.ndb_no
        LEFT JOIN nutr_def nrd ON nrd.nutr_no = nd.nutr_no
        WHERE md.mm_id IN (?)
        ORDER BY md.id, nrd.sr_order
        `, meal_id).then(data=>{
          resolve(data);
        }).catch(error=>{
          reject(error);
        })
      });
    }
};

module.exports = home;
