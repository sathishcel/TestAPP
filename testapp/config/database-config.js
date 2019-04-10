var development = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'ewa_development'
  }
}

var test = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'ewa_test'
  }
}

switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = test
    break
  case 'development':
    module.exports = development
    break
  default:
    module.exports = development
    break
}
