'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Associations
const { adviser, chat, chats_user, feedback, message, post, source, user } = sequelize.models;

user.hasOne(adviser, { foreignKey: 'userId' });
adviser.belongsTo(user);

feedback.belongsTo(adviser);
adviser.hasMany(feedback);

feedback.belongsTo(post);
post.hasMany(feedback);

post.belongsTo(user);
user.hasMany(post);

post.hasMany(source);
source.belongsTo(post);

message.belongsTo(user, { foreignKey: 'sender' }); // cascade 안걸림 혹시나 문제있을경우 여기만져보기
message.belongsTo(user, { foreignKey: 'receiver' });
user.hasMany(message, { foreignKey: 'sender' });
user.hasMany(message, { foreignKey: 'receiver' });

message.belongsTo(chat);
chat.hasMany(message);

user.belongsToMany(chat, { through: chats_user });
chat.belongsToMany(user, { through: chats_user });

adviser.belongsToMany(post, { through: feedback });
post.belongsToMany(adviser, { through: feedback });
// post.belongsTo(feedback);
// feedback.hasOne(post, {
//   foreignKey: 'selected',
// });
module.exports = db;
