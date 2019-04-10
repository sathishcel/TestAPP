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
}

exports.up = function (db, callback) {
  db.createTable('emergency_detail', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    emp_id: 'int',
    org_id: 'int',
    blood_group: 'string',
    emergency_info: 'jsonb[]'
  }, callback)
}

exports.down = function (db, callback) {
  db.dropTable('emergency_detail', callback)
}

exports._meta = {
  'version': 1
}
