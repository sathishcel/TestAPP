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
  db.createTable('grades', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    org_id: { type: 'int' },
    name: { type: 'string' },
    updated_by_id: { type: 'int' },
    status: { type: 'int', defaultValue: 1 }, // To make grades hide or show
    description: { type: 'string' },
    created_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, callback)
  console.log('Grades token table created')
}

exports.down = function (db, callback) {
  db.dropTable('grades', callback)
  console.log('Grades token table removed')
}

exports._meta = {
  'version': 1
}
