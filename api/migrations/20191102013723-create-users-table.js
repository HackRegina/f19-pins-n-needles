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

exports.up = function(db, cb) {
  db.createTable('users', {
    id: { type: 'uuid', primaryKey: true, defaultValue: new String('gen_random_uuid()') },
    email: { type: 'string', unique: true, notNull: true },
    password: { type: 'varchar(60)' },
    first_name: { type: 'string', notNull: true },
    last_name: { type: 'string', notNull: true },
    created: { type: 'timestamp', notNull: true, defaultValue: new String('now()') },
    updated: 'timestamp'
  }, cb)
};

exports.down = function(db, cb) {
  db.dropTable('users', cb)
};

exports._meta = {
  "version": 1
};
