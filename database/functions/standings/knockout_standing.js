module.exports = async function get_knockout_standing(pool, user_auth) {
  const knockout_query = `
    WITH ratio_table as (
      SELECT 
      user_auth,
      wins,
      loses,
      knockouts
      FROM
      users
    ),
    ordered_table AS (
      SELECT
      *,
      ROW_NUMBER () OVER (ORDER BY knockouts DESC, wins DESC, loses ASC) AS standing
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
      user_auth, knockouts, wins, loses, standing, total_players
    FROM
      ordered_table
    CROSS JOIN
      all_player_count
    WHERE
      user_auth = $1;  
  `

  const userStanding = pool.query(knockout_query, [user_auth])
      .then(res => res.rows[0]);

  return userStanding;
}
