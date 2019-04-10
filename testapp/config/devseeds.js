'use strict'

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt'))
const securityConfig = require('./security-config')
const dbConfig = require('./database-config')
const knex = require('knex')(dbConfig)
const User = require('../models/user')

/* build default data */
var userData = [{ email: 'ewadev@celsysemail.celsyswtc.in',
  password: bcrypt.hashSync('Cel@123',
    securityConfig.saltRounds),
  role_id: 1,
  firstname: 'Celestial',
  lastname: 'Developer',
  status: 2,
  created_at: new Date(),
  updated_at: new Date() }
]
knex.insert(userData).into('users').then(function (data) {
  User.where('email', 'ewadev@celsysemail.celsyswtc.in').fetch().then(function (user) {
    var employeeData = [{ emp_id: 1,
      org_id: 1,
      user_id: user.get('id'),
      theme_settings_id: 1,
      firstname: 'Celestial',
      lastname: 'Developer',
      created_at: new Date(),
      updated_at: new Date() }
    ]
    knex.insert(employeeData).into('employees').then(function (id) {
      console.log('one dev user created')
    })
  })
})
