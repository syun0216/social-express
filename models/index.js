export const connect = async () => {
    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('database', null, null, {
      dialect: 'sqlite',
      operatorsAliases: Sequelize.Op,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      storage: './db/database.sqlite'
    });
    await sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
    APP.sequelize = sequelize;
}

