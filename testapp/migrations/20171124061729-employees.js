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
  db.createTable('employees', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    emp_id: 'int',
    org_id: 'int',
    user_id: 'int',
    theme_settings_id: 'int',
    firstname: 'string',
    lastname: 'string',
    dob: 'bigint',
    father_name: 'string',
    sex: 'string',
    designation: 'string',
    grade_id: 'int',
    doj: 'bigint',
    group_ids: 'string',
    location_id: 'int',
    age: 'int',
    manager_email: 'string',
    manager_hr_email: 'string',
    manager_fin_email: 'string',
    email: 'string',
    image: 'text',
    created_at: 'timestamp',
    updated_at: 'timestamp'
  }, callback)
};

exports.down = function (db, callback) {
  db.dropTable('employees', callback)
};

exports._meta = {
  'version': 1
}
