module.exports = async function update_knockout(pool, user_auth) {
  const updateQuery = `
    UPDATE
      users
    SET
      knockouts = knockouts + 1
    WHERE
      user_auth = $1
  `
  await pool.query(updateQuery, [user_auth]);
}
