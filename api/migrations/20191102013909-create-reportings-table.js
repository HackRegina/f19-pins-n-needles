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
  db.createTable('reportings', {
    id: { type: 'uuid', primaryKey: true, defaultValue: new String('gen_random_uuid()') },
    email: 'string',
    phone: 'string',
    description: 'string',
    place_id: 'string',
    geog: {type: 'geography(POINT)', notNull: true},
    address: 'string',
    picked_up_by: {
      type: 'uuid', foreignKey: {
        name: 'reportings_user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    created: { type: 'timestamp', notNull: true, defaultValue: new String('now()') },
    updated: 'timestamp'
  }, cb)
};

exports.down = function(db, cb) {
  db.dropTable('reportings', cb)
};

exports._meta = {
  "version": 1
};
