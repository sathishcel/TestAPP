const bookshelf = require('../../config/bookshelf-instance').plugin(require('bookshelf-mask'))

module.exports = bookshelf.Model.extend({
  tableName: 'predefined_themes'
}, {
  masks: {
    preThemes: 'name,id,backgroundColor,foregroundColor,userPanelColor'
  }
})
