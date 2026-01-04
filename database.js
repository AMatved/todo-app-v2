// Universal database module - selects SQLite or PostgreSQL based on environment

if (process.env.DATABASE_URL) {
  // Production: Use PostgreSQL
  module.exports = require('./database-pg');
} else {
  // Development: Use SQLite
  module.exports = require('./database-sqlite');
}
