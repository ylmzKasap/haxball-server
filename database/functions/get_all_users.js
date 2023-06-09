module.exports = async function get_all_users(pool) {
  const getQuery = `
    SELECT
      user_auth, is_admin, is_super_admin, wins, loses, knockouts
    FROM
      users
  `
  const user_info = await pool.query(getQuery)
    .then(res => res.rows).catch((err) => err);

  return user_info;
}