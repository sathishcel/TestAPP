const bookshelf = require('../../../config/bookshelf-instance')

module.exports = bookshelf.Model.extend({
  tableName: 'bank_info',
  // scopes: {
  //   required: function (qb) {
  //     qb.where({status: 1})
  //   }
  // }
})
