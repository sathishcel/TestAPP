'use strict'

const dbConfig = require('./database-config')
const knex = require('knex')(dbConfig)
const bookShelf = require('bookshelf')(knex)
bookShelf.plugin([require('bookshelf-scopes'), require('bookshelf-eloquent')])
module.exports = bookShelf
