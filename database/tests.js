const { drop_table, create_users_table, create_username_table } = require("./create_tables");

async function teardown(db) {
  await drop_table(db, "usernames");
  await drop_table(db, "users");
}

async function setup(db) {
  await create_users_table(db);
  await create_username_table(db);
}

module.exports = {
  teardown, setup
}