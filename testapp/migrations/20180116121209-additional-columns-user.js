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
    db.addColumn('users', 'resend_otc_count', { type: 'int', defaultValue: 0 });
    db.addColumn('users', 'forgot_otc_count', { type: 'int', defaultValue: 0 });
    db.addColumn('users', 'forgot_otc_at', { type: 'timestamp' });
    db.renameColumn('users', 'otc_expires_at', 'resend_otc_at', callback);
};

exports.down = function(db, callback) {
    db.removeColumn('users', 'resend_otc_count');
    db.removeColumn('users', 'forgot_otc_count');
    db.removeColumn('users', 'forgot_otc_at');
    db.renameColumn('users', 'resend_otc_at', 'otc_expires_at', callback);
};

exports._meta = {
    "version": 1
};