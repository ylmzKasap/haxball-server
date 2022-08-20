module.exports = async function get_lose_standing(pool, user_auth) {
  const lose_query = `
    WITH ratio_table as (
      SELECT 
      user_auth,
      loses,
      wins
      FROM
      users
    ),
    ordered_table AS (
      SELECT
      *,
      ROW_NUMBER () OVER (ORDER BY loses DESC, wins ASC) AS standing
      FROM
      ratio_table
    ),
    all_player_count AS (
      SELECT
      COUNT(*) as total_players
      FROM
      users
    )
    SELECT
      user_auth, loses, wins, standing, total_players
    FROM
      ordered_table
    CROSS JOIN
      all_player_count
    WHERE
      user_auth = $1;  
  `

  const userStanding = pool.query(lose_query, [user_auth])
      .then(res => res.rows[0]);

  return userStanding;
}
