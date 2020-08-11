const envVariables = {
    env: process.env.NODE_ENV,
    app: {
      secretKey: process.env.APP_SECRET_KEY || '',
      port: process.env.APP_PORT || 1998,
      apiLimit:{
        time:1,
        max:30
      }
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        scheme: process.env.DB_SCHEME || 'project_nodejs'
    },
    mongo:{
        host: process.env.LOG_DB_HOST || 'localhost',
        port: process.env.LOG_DB_PORT || 27017,
        username: process.env.LOG_DB_USER || '',
        password: process.env.LOG_DB_PASS || '',
        scheme: process.env.LOG_DB_SCHEME || 'project_nodejs'
      }
  }
  
  // console.log(envVariables);
  
  module.exports = envVariables;