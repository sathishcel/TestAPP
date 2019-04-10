'use strict'

var dbm
var type
var seed

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
};

exports.up = function (db, callback) {
  db.createTable('permissions', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    perm_id: { type: 'int', unique: 'true' },
    name: { type: 'string' },
    description: { type: 'string' },
    parent_id: { type: 'int' },
    status: { type: 'int', defaultValue: 1 }
  }, callback)
  console.log('Permissions table created')
}

exports.down = function (db, callback) {
  db.dropTable('permissions', callback)
  console.log('Permissions table removed')
}

exports._meta = {
  'version': 1
}
