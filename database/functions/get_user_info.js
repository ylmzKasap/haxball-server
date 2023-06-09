module.exports = async function get_user_info(pool, user_auth) {
  const getQuery = `
    SELECT
      user_auth, is_admin, is_super_admin, wins, loses, knockouts
    FROM
      users
    WHERE
      user_auth = $1
  `

  const user_info = await pool.query(getQuery, [user_auth])
    .then(res => res.rows[0]).catch((err) => err);

  return user_info;
}