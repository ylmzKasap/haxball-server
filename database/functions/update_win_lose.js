async function increment_win(pool, user_auth) {
  const updateQuery = `
    UPDATE
      users
    SET
      wins = wins + 1
    WHERE
      user_auth = $1
    RETURNING
      wins
  `
  const user_win = await pool.query(updateQuery, [user_auth])
    .then(res => res.rows[0]);

  return user_win;
}

async function increment_lose(pool, user_auth) {
  const updateQuery = `
    UPDATE
      users
    SET
      loses = loses + 1
    WHERE
      user_auth = $1
  `
  await pool.query(updateQuery, [user_auth]);
}

module.exports = {
  increment_win, increment_lose
}