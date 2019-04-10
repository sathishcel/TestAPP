const bookShelf = require('../../../config/bookshelf-instance').plugin('pagination')

module.exports = bookShelf.Model.extend({
  tableName: 'grades',
  scopes: {
    required: function (qb) {
      qb.where({status: 1})
    }
  }
})
