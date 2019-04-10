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
  db.createTable('org_address', {
    id: {type: 'int', primaryKey: true, autoIncrement: true},
    org_id: {type: 'int'},
    line1: { type: 'string' },
    line2: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    country: { type: 'string' },
    zipcode: { type: 'string' },
    short_name: { type: 'string', unique: 'true' },
    fax: { type: 'string' },
    contact_number: { type: 'string' },
    alternative_number: { type: 'string' },
    currency: { type: 'string' },
    timezone: { type: 'string' },
    country_code: { type: 'string' },
    updated_by_id: { type: 'int' },
    mandatory: { type: 'boolean' },
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
  console.log('OrgAddress table created')
}

exports.down = function (db, callback) {
  db.dropTable('org_address', callback)
  console.log('OrgAddress table dropped')
}

exports._meta = {
  'version': 1
}
