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
  db.createTable('other_detail', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    emp_id: 'int',
    org_id: 'int',
    employee_type: 'string',
    employee_status: 'string',
    bgVerify_status: 'string',
    bgVerify_date: 'bigint',
    relieving_date: 'bigint'
  }, callback)
}

exports.down = function (db, callback) {
  db.dropTable('other_detail', callback)
};

exports._meta = {
  'version': 1
}
