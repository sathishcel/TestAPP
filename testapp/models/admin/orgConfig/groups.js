const bookshelf = require('../../../config/bookshelf-instance')
const Role = require('./roles')
const User = require('../../user')

module.exports = bookshelf.Model.extend({
  tableName: 'groups',
  scopes: {
    required: function (qb) {
      qb.where({status: 1})
    }
  },
  // users: function () {
  //   return this.hasMany(User)
  // },
  role: function () {
    return this.hasMany(Role, 'group_id')
  }
})
