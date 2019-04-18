'use strict'

const mysql = require('mysql')

/* for localhost mysql database */
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  name: process.env.DB_NAME || '',
  port: process.env.DB_PORT
}

if (process.env.DB_SSL === 'true') {
  Object.assign({}, config, {ssl: process.env.DB_SSL_KEY})
}

const state = {
  pool: null
}

exports.connect = function () {
  let pool_options = {
    connectionLimit: 100, // important
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name,
    port: config.port,
    multipleStatements: true
  }

  if (config.ssl) {
    pool_options = {
      ...pool_options,
      ssl: {
        ca: config.ssl
      }
    }
  }

  state.pool = mysql.createPool(pool_options)

  let conn = execute('Select version()', [])
  conn.then((data) => {
    console.log('info', `[DB][connect]`, data)
  }).catch((error) => {
    console.log('error', `[DB][connect]`, error)
    process.exit(1)
  })
}

exports.mysql = mysql;

exports.get = function () {
  return state.pool
}

function execute (sql, param) {
  return new Promise((resolve, reject) => {
    state.pool.getConnection(function (error, connection) {
      if (error) {
        console.log('error', `[DB][execute]`, error)
        reject(error)
      } else {
        connection.query(sql, param, function (err, rows) {
          connection.release()
          if (!err) {
            let data = JSON.parse(JSON.stringify(rows))
            resolve(data)
          } else {
            console.log('error', `[DB][execute]`, err)
            reject(err)
          }
        })

        connection.on('error', function (err) {
          connection.release()
          console.log('error', `[DB][execute]`, err)
          reject(err)
        })
      }
    })
  })
};

exports.execute = execute