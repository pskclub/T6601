import type { Knex } from 'knex'

const dotenv = require('dotenv')
dotenv.config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.APP_DB_HOST || process.env.DB_HOST,
      port: +(process.env.APP_DB_PORT || process.env.DB_PORT || 3306),
      database: process.env.APP_DB_NAME || process.env.DB_NAME,
      user: process.env.APP_DB_USER || process.env.DB_USER,
      password: process.env.APP_DB_PASSWORD || process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.env.APP_DB_HOST || process.env.DB_HOST,
      port: +(process.env.APP_DB_PORT || process.env.DB_PORT || 3306),
      database: process.env.APP_DB_NAME || process.env.DB_NAME,
      user: process.env.APP_DB_USER || process.env.DB_USER,
      password: process.env.APP_DB_PASSWORD || process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations'
    }
  }

}

module.exports = config
