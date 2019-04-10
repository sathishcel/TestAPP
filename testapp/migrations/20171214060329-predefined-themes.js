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
    db.createTable('predefined_themes', {
        theme_id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string' },
        id: { type: 'string' },
        backgroundColor: { type: 'string' },
        foregroundColor: { type: 'string' },
        userPanelColor: { type: 'string' }
    }, callback);
    console.log("Predefeined themes table created");
};

exports.down = function(db, callback) {
    db.dropTable('predefined_themes', callback);
    console.log("Predefined Themes table droped");
};

exports._meta = {
    "version": 1
};