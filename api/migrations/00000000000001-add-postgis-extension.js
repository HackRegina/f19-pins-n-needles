'use strict'

var dbm
var type
var seed
var fs = require('fs');
var install = fs.readFileSync(`${__dirname}/../migration-scripts/postgis_addons.sql`).toString();
var uninstall = fs.readFileSync(`${__dirname}/../migration-scripts/postgis_addons_uninstall.sql`).toString();

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate
  type = dbm.dataType
  seed = seedLink
}

exports.up = function (db, cb) {
  db.runSql(`
  create extension if not exists postgis;
  create extension if not exists pgcrypto;
  create extension if not exists "uuid-ossp";
  create extension if not exists fuzzystrmatch;
  create extension if not exists postgis_tiger_geocoder;
  create extension if not exists postgis_topology;
  `, cb)
  db.runSql(install, cb)
}

exports.down = function (db, cb) {
  db.runSql(`
  drop extension postgis;
  drop extension fuzzystrmatch;
  drop extension pgcrypto;
  drop extension "uuid-ossp";
  drop extension postgis_tiger_geocoder;
  drop extension postgis_topology;
  `, cb)
  db.runSql(uninstall, cb)
}

exports._meta = {
  'version': 1
}
