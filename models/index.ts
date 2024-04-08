// @ts-nocheck
'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
const basename = path.basename(__filename);
import config from '../config/dbConfig'
export const db = {};

export let sequelize = new Sequelize(config.database, config.username, config.password, config.options);

fs.readdirSync(__dirname)
    .filter(file => { return ( file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts' && file.indexOf('.test.js') === -1 );})
    .forEach(file => {
    const model = require(path.join(__dirname, file)).model(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
