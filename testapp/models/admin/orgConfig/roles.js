'use strict'

const bookshelf = require('../../../config/bookshelf-instance').plugin(require('bookshelf-mask'))
// const Group = require('./groups')

module.exports = bookshelf.Model.extend({
  tableName: 'roles'
}, {
  /* this function will fetch the role */
  getRole: function (roleId) {
    return this.forge().query({where: { id: roleId }}).fetch()
  }
  // groups: function () {
  //   return this.belongsTo(Group)
  // }
})
