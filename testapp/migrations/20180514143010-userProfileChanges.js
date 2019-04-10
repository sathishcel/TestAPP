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
  db.createTable('user_profile_changes', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    emp_id: { type: 'int' },
    user_data: { type: 'jsonb' },
    ori_user_data: { type: 'jsonb' },
    requested_date: { type: 'bigint' },
    approve_date: { type: 'bigint' },
    reject_date: { type: 'bigint' },
    reason: { type: 'text' },
    status: { type: 'int', defaultValue: 1 }
  }, callback)
}

exports.down = function (db, callback) {
  db.dropTable('user_profile_changes', callback)
}

exports._meta = {
  'version': 1
}
