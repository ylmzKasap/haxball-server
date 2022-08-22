const get_last_username = require("./get_last_username");

module.exports = async function get_top_x_players(pool, order_type, limit) {
  let getQuery;
  if (order_type === 'win_ratio' || order_type === 'knockout_ratio') {
    const orderColumn = order_type === 'win_ratio' ? 'wins' : 'knockouts';
    getQuery = `
        SELECT 
          user_auth,
          wins,
          loses,
          ${orderColumn === 'knockouts' ? 'knockouts,' : ''}
          ROUND(${orderColumn}::numeric / COALESCE(NULLIF(wins + loses, 0), 1), 2)
          ${orderColumn === 'wins' ? " * 100" : ""} AS ${order_type}
        FROM
          users
        WHERE
          wins + loses > 30
        ORDER BY
          ${order_type} DESC, wins DESC
        LIMIT ${limit};
    `
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