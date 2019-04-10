'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('govt_docs_detail', {
    id: { type: 'int', primaryKey: 'true', autoIncrement: 'true' },
    emp_id: 'int',
    org_id: 'int',
    pass_number: 'string',
    pass_issue_date: 'bigint',
    pass_expiry_date: 'bigint',
    place_of_issue: 'string',
    other_docs_info: 'jsonb[]'
  }, callback)
};

exports.down = function(db, callback) {
  db.dropTable('govt_docs_detail', callback)
};

exports._meta = {
  "version": 1
};
