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
    }
};

module.exports = home;
