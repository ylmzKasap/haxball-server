module.exports = async function update_timestamp(pool, user_auth) {
  const updateQuery = `
    UPDATE
      users
    SET
      last_join = (now()::timestamp(0))
    WHERE
      user_auth = $1
  `
  await pool.query(updateQuery, [user_auth]);
}