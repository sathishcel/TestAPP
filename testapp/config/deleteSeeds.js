/* add all the seed data in this file */
'use strict'

var dbConfig = require('./database-config')
var knex = require('knex')(dbConfig)

/* formating the tables before insertion */
knex.schema.dropTableIfExists('govt_docs')
  .then(function () {
    return true
  })

knex.schema.dropTableIfExists('users')
  .then(function () {
    console.log('users table deleted')
    return true
  })

knex.schema.dropTableIfExists('employees')
  .then(function () {
    console.log('employees table deleted')
    return true
  })

knex.schema.dropTableIfExists('predefined_themes')
  .then(function () {
    console.log('predefined_themes table deleted')
    return true
  })

knex.schema.dropTableIfExists('theme_settings')
  .then(function () {
    console.log('theme_settings table deleted')
    return true
  })

knex.schema.dropTableIfExists('organizations')
  .then(function () {
    console.log('organizations table deleted')
    return true
  })

knex.schema.dropTableIfExists('roles')
  .then(function () {
    console.log('roles table deleted')
    return true
  })

knex.schema.dropTableIfExists('permissions')
  .then(function () {
    console.log('permissions table deleted')
    return true
  })

  knex.schema.dropTableIfExists('org_address')
  .then(function () {
    console.log('org_address table deleted')
    return true
  })

  knex.schema.dropTableIfExists('bank_info')
  .then(function () {
    console.log('bank_info table deleted')
    return true
  })

knex.schema.dropTableIfExists('grades')
  .then(function () {
    console.log('grades table deleted')
    return true
  })

knex.schema.dropTableIfExists('groups')
  .then(function () {
    console.log('groups table deleted')
    return true
  })
