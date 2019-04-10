const bookshelf = require('../config/bookshelf-instance')
const User = require('./user')
const Organization = require('./admin/organization')
const Promise = require('bluebird')
const dbConfig = require('../config/database-config')
const knex = require('knex')(dbConfig)

module.exports = bookshelf.Model.extend({
  tableName: 'employees',
  scopes: {
    nameContains: function (qb, id) {
      qb.where(knex.raw('grade_id = ?', '' + id + ''));
    }
  },
  initialize () {
    this.on('creating', model => {
      return Promise.coroutine(function * () {
        model.set({ 'created_at': new Date(), 'updated_at': new Date() })
      })()
    })
  },
  organization: function () {
    return this.belongsTo(Organization)
  },
  user: function () {
    return this.belongsTo(User)
  }
})
