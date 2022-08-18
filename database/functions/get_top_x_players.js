const get_last_username = require("./get_last_username");

module.exports = async function get_top_x_players(pool, order_type, limit) {
  let getQuery;
  if (order_type === 'win_ratio') {
    getQuery = `
      SELECT 
        user_auth,
        wins,
        loses,
        ROUND(wins::numeric / COALESCE(NULLIF(wins + loses, 0), 1), 2) * 100 AS win_ratio
      FROM
        users
      ORDER BY
        ${order_type} DESC, wins DESC
      LIMIT ${limit};
    `
  } else if (order_type === 'knockout_ratio') {
    getQuery = `
      SELECT 
        user_auth,
        wins,
        loses,
        knockouts,
        ROUND(knockouts::numeric / COALESCE(NULLIF(wins + loses, 0), 1), 2) AS knockout_ratio
      FROM
        users
      ORDER BY
        ${order_type} DESC, wins DESC
      LIMIT ${limit}; `
  }
  else {
    // Queries for 'wins', 'loses', 'knockouts'
    getQuery = `
      SELECT
        user_auth, ${order_type}
      FROM
        users
      ORDER BY
        ${order_type} DESC
      LIMIT ${limit};
  `
  }

  let top_users = await pool.query(getQuery)
    .then(res => res.rows).catch(() => false);

  let usersWithNames = [];
  for (let i=0; i < top_users.length; i++ ) {
    const lastUsername = await get_last_username(pool, top_users[i].user_auth);

    if (!lastUsername) {
      console.log(`Could not find the username of ${top_users[i].user_auth}`);
      continue;
    }
    
    usersWithNames.push({
      ...top_users[i],
      username: lastUsername.username
    })
  }

  return usersWithNames;
}