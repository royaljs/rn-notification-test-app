module.exports = {
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3400,
  "username": "root",
  "password": "root",
  "database": "pushdb",
  "entities": ["dist/**/**.entity.{ts,js}"],
  "synchronize": true
}