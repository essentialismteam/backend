const localPgConnection = {
  host: 'localhost',
  database: 'postgres',
  user: 'postgres',
  password: process.env.LOCALPG_PW
}

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/essentialism.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'db_migrations'
    },
    seeds: {
      directory: './database/seeds',
    }
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: prodDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  }

};
