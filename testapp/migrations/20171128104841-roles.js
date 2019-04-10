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
  db.createTable('roles', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    org_id: { type: 'int' },
    name: { type: 'string' },
    description: { type: 'string' },
    group_id: { type: 'int' },
    role_group: { type: 'string' },
    permissions: { type: 'jsonb[]' },
    updated_by_id: { type: 'int' },
    status: { type: 'int', defaultValue: 1 },
    created_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, callback)
}

exports.down = function (db, callback) {
  db.dropTable('roles', callback)
  console.log('Roles table dropped')
}

exports._meta = {
  'version': 1
}
