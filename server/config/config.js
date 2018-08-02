var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  console.log('CPOUCOUCOUCOUCOUCOUOCUC');
  let config = require('./config.json');
  let envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    console.log(key + ' : ');
    console.log(envConfig[key]);
    process.env[key] = envConfig[key];
  });
};
