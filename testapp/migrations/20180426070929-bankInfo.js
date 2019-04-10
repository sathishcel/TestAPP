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
  db.createTable('bank_info', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    org_id: {type: 'int'},
    org_address_id: { type: 'int' },
    label_name: { type: 'string' },
    info_type: { type: 'string' },
    mandatory: { type: 'boolean' },
    status: { type: 'int', defaultValue: 1 }
  }, callback)
  console.log('orgAddress table created')
}

exports.down = function (db, callback) {
  db.dropTable('bank_info', callback)
  console.log('orgAddress table droped')
}

exports._meta = {
  'version': 1
}
