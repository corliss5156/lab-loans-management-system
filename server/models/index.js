'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// const itemstock = "CREATE OR REPLACE VIEW `labloans`.`itemstock` AS SELECT `labloans`.`items`.`name` AS `name`, `labloans`.`items`.`description` AS `description`, `labloans`.`stocks`.`lab` AS `lab`,`labloans`.`stocks`.`quantity` AS `quantity`, `labloans`.`stocks`.`status` AS `status` FROM(`labloans`.`items` JOIN `labloans`.`stocks`) WHERE (`labloans`.`items`.`name` = `labloans`.`stocks`.`item`)"
// const results = sequelize.query(itemstock)
// const inventorystock = "create or replace view `labloans`.`inventorystock` as select t1.name, t1.lab, t1.description, t1.quantity as Available, t2.quantity as 'OnLoan', t3.quantity as 'LabUse' from itemstock t1, itemstock t2, itemstock t3 where t1.name = t2.name AND t1.name = t3.name AND t1.lab = t2.lab AND t1.lab = t3.lab AND t1.status = 'Available' AND t2.status = 'On loan' AND t3.status = 'Lab use'"
// sequelize.query(inventorystock)
// const inventorystocksum = "CREATE OR REPLACE VIEW `labloans`.`inventorystocksum` AS SELECT `labloans`.`inventorystock`.`name` AS `name`, `labloans`.`inventorystock`.`description` AS `description`, SUM(`labloans`.`inventorystock`.`Available`) AS `available`, SUM(`labloans`.`inventorystock`.`OnLoan`) AS `On loan`, SUM(`labloans`.`inventorystock`.`LabUse`) AS `Lab use` FROM `labloans`.`inventorystock` GROUP BY `labloans`.`inventorystock`.`name`"
// sequelize.query(inventorystocksum)
module.exports = db;
