async function get_usernames(pool, user_auth) {
  const getQuery = `
    SELECT
      user_auth, username
    FROM
      users
    LEFT JOIN
      usernames
    ON
      users.user_auth = usernames.username_auth
    WHERE
      user_auth = $1
  `

  let user_info = await pool.query(getQuery, [user_auth])
    .then(res => res.rows).catch(() => false);

  if (user_info) {
    user_info = user_info.map(x => x.username);
  }

  return user_info;
}

async function set_username(pool, user_auth, username) {
  const getQuery = `
    INSERT INTO usernames
      (username_auth, username)
    VALUES
      ($1, $2)    
  `

  await pool.query(getQuery, [user_auth, username])
    .catch((err) => console.log(err));
}

module.exports = {
  get_usernames, set_username
}