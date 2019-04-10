const bookshelf = require('../../../config/bookshelf-instance')
const OrgAddress = require('./orgAddress')

module.exports = bookshelf.Model.extend({
  tableName: 'govt_accounts'
})
