const bookshelf = require('../../../config/bookshelf-instance')

module.exports = bookshelf.Model.extend({
  tableName: 'family_detail'
})
