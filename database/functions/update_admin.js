module.exports = async function update_admin(pool, user_auth, decision) {
  const adminValue = decision === true ? "TRUE" : "FALSE";

  const updateQuery = `
    UPDATE
      users
    SET
      is_admin = $1
    WHERE
      user_auth = $2
  `
  await pool.query(updateQuery, [adminValue, user_auth]);
}
