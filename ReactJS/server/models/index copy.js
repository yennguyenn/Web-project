'use strict';
require('dotenv').config();  // Ensure dotenv is loaded first

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Initialize Sequelize with environment configuration
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read model files and initialize them
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // Ignore hidden files
      file !== basename &&        // Ignore the index.js file itself
      file.slice(-3) === '.js' &&  // Only include .js files
      file.indexOf('.test.js') === -1  // Exclude test files
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Store the model in db object
  });

// Associate models if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export db object with sequelize and Sequelize instances
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
