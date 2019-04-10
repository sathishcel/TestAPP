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
  db.createTable('contact_detail', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    emp_id: 'int',
    org_id: 'int',
    residential_address: 'jsonb',
    permanent_address: 'jsonb',
    landline_number: 'string',
    personal_email: 'string',
    mobile_number: 'string'
  }, callback)
}

exports.down = function (db, callback) {
  db.dropTable('contact_detail', callback)
}

exports._meta = {
  'version': 1
}
