const config = {
  database: process.env.DB_NAME,
  username: process.env.CRUD_DB_USER,
  password: process.env.CRUD_BD_PASS,
  options: {
    logging: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      connectTimeout: 60000,
      options: {
        encrypt: true,
        requestTimeout: 1000000,
      },
    },
    pool: {
      max: 100,
      min: 5,
      acquire: 60000,
      idle: 30000,
    },
  }
}

export default config