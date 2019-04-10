const bookshelf = require('../../../config/bookshelf-instance')

module.exports = bookshelf.Model.extend({
  tableName: 'permissions',
  scopes: {
    required: function (qb) {
      qb.where({status: 1})
    }
  }
})
