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
  db.createTable('govt_accounts', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    org_id: { type: 'int' },
    org_address_id: { type: 'int' },
    label: { type: 'string' },
    type: { type: 'string' },
    mandatory: { type: 'boolean' }
  }, callback)
  console.log('govt_accounts table created')
}

exports.down = function (db, callback) {
  db.dropTable('govt_accounts', callback)
  console.log('govt_accounts table droped')
}

exports._meta = {
  'version': 1
}
