import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('TestDB', 'root', 'ardit123456', {
  dialect: 'mysql',
  host: 'localhost',
});
