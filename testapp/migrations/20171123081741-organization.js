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


/* () creates table
/*
/* @db {Object} has database connection
/* @callback {function} to mark end of migration */
exports.up = (db, callback) => {
    db.createTable('organizations', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string' },
        created_at: {
            type: `timestamp`,
            defaultValue: new String('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: `timestamp`,
            defaultValue: new String('CURRENT_TIMESTAMP')
        },
    }, callback);
    console.log("Organization table created");
};


/* () drops table
/*
/* @db {Object} has database connection
/* @callback {function} to mark end of migration */
exports.down = (db, callback) => {
    db.dropTable('organizations', callback);
    console.log("Organizations table droped");
};

exports._meta = {
    "version": 1
};