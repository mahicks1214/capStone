// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();
const connectionString = process.env.DB_CONNECTION_STRING;
module.exports = {

  development: {
    client: 'postgresql',
    connection: connectionString || {
      database: 'postgres',
      user: 'postgres',
      password: 'docker',
    }

      // // host: '127.0.0.1',
      // database: 'postgres',
      // user: 'postgres',
      // password: 'docker',
      // // port: 5432
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
