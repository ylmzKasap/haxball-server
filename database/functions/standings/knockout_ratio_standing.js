module.exports = async function get_knockout_ratio_standing(pool, user_auth) {
  const knockout_ratio_query = `
  WITH ratio_table as (
    SELECT 
      user_auth,
      wins,
      loses,
      knockouts,
      ROUND(knockouts::numeric / COALESCE(NULLIF(wins + loses, 0), 1), 2) AS knockout_ratio
    FROM
      users
  ),
  ordered_table AS (
    SELECT
      *,
      ROW_NUMBER () OVER (ORDER BY knockout_ratio DESC, wins DESC, loses ASC) AS standing
    FROM
      ratio_table
  ),
  all_players AS (
    SELECT
      COUNT(*) as total_players
    FROM
      users
  )
  SELECT
    user_auth, wins, loses, knockouts, knockout_ratio, standing, total_players
  FROM
    ordered_table
  CROSS JOIN
    all_players
  WHERE
    user_auth = $1;
  `

  const userStanding = pool.query(knockout_ratio_query, [user_auth])
      .then(res => res.rows[0]);

  return userStanding;
}
