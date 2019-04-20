module.exports = {
  apps: [{
    name: 'server',
    script: './server.js',
    output: './out.log',
    error: './error.log',
    log: './combined.outerr.log',
    merge_logs: true,
    env: {
      NODE_ENV: 'development'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
