module.exports = async function add_user_database(pool, user_auth, username) {
  const userQuery = `
    WITH user_table AS (
      INSERT INTO users
       (user_auth)
      VALUES
        ($1)
      RETURNING
        user_auth, is_admin, wins, loses, knockouts
    ),
    username_table AS (
      INSERT INTO usernames
        (username_auth, username)
      VALUES
        ($2, $3)
    )
    SELECT
      user_auth, is_admin, wins, loses, knockouts
    FROM
      user_table
  `
  const user_info = await pool.query(userQuery, [user_auth, user_auth, username])
      .then(res => res.rows[0]).catch(err => console.log(err));

  return user_info;
}