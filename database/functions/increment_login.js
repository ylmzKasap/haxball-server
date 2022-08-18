module.exports = async function increment_login(pool, user_auth, username) {
  const updateQuery = `
    UPDATE
      usernames
    SET
      login_count = login_count + 1, last_login_date = (now()::timestamp(0))
    WHERE
      username_auth = $1 AND username = $2
  `
  await pool.query(updateQuery, [user_auth, username]);
}
