'use strict'

var dbm, type, seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

/* () creates table
/*
/* @db {Object} has database connection
/* @callback {function} to mark end of migration */
exports.up = (db, callback) => {
  db.createTable('theme_settings', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    org_id: {
      type: 'int',
      notNull: true,
      unique: true
    },
    settingPageData: { type: 'jsonb[]' },
    created_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: `timestamp`,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  }, callback())
}

/* () drops table
/*
/* @db {Object} has database connection
/* @callback {function} to mark end of migration */
exports.down = (db, callback) => {
  db.dropTable('theme_settings', callback)
  console.log('ThemeSettings table droped')
}

exports._meta = {
  'version': 1
}