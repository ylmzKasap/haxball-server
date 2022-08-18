module.exports = async function get_last_username (pool, user_auth) {
  const lastUsernameQuery = `
    SELECT 
      user_auth, wins, loses, knockouts, username
    FROM
      users user_table
    JOIN 
      (SELECT
        username_auth, username, MAX(last_login_date) timestamp
      FROM
        usernames
      GROUP BY
        username_auth, username
      ORDER BY
        timestamp DESC) username_table
    ON
      user_table.user_auth = username_table.username_auth
    WHERE
      user_auth = $1
    LIMIT 1
  `
  const lastNameLoggedIn = await pool.query(lastUsernameQuery, [user_auth])
    .then(res => res.rows[0]).catch(err => console.log(err));
  
  return lastNameLoggedIn;
}