async function drop_table(pool, table) {
  await pool.query(`DROP TABLE IF EXISTS ${table}`);
}

async function create_users_table(pool) {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
      user_id BIGSERIAL PRIMARY KEY NOT NULL,
      user_auth VARCHAR(100) UNIQUE NOT NULL,
      wins BIGINT DEFAULT 0,
      loses BIGINT DEFAULT 0,
      knockouts BIGINT DEFAULT 0,
      last_join TIMESTAMP NOT NULL DEFAULT (now()::timestamp(0))
  );`).catch(err => console.log(err));
}

async function create_username_table(pool) {
  await pool.query(`CREATE TABLE IF NOT EXISTS usernames (
      username_id BIGSERIAL PRIMARY KEY NOT NULL,
      username_auth VARCHAR(100) REFERENCES users (user_auth) ON DELETE CASCADE,
      username VARCHAR(50) NOT NULL
      );`)
      .catch(err => console.log(err));
}

module.exports = {
  drop_table, create_users_table, create_username_table
}