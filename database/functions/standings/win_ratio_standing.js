module.exports = async function get_win_ratio_standing(pool, user_auth) {
  const win_ratio_query = `
    WITH ratio_table as (
      SELECT 
        user_auth,
        wins,
        loses,
        ROUND(wins::numeric / COALESCE(NULLIF(wins + loses, 0), 1), 2) * 100 AS win_ratio
      FROM
        users
    ),
    ordered_table AS (
      SELECT
        *,
        ROW_NUMBER () OVER (ORDER BY win_ratio DESC, wins DESC) AS standing
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
      user_auth, wins, loses, win_ratio, standing, total_players
    FROM
      ordered_table
    CROSS JOIN
      all_player_count
    WHERE
      user_auth = $1;  
  `

  const userStanding = pool.query(win_ratio_query, [user_auth])
      .then(res => res.rows[0]);

  return userStanding;
}
