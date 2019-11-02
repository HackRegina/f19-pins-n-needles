require('dotenv').config()
var waitForPort = require('wait-for-port')

console.log(`Waiting for database [${process.env.TYPEORM_HOST}:${process.env.TYPEORM_PORT}]`)

waitForPort(process.env.TYPEORM_HOST, process.env.TYPEORM_PORT, function (err) {
  if (err) throw new Error(err)
  console.log(`Database is listening [${process.env.TYPEORM_HOST}:${process.env.TYPEORM_PORT}]`)
})
