const { increment_win, increment_lose } = require("../database/functions/update_win_lose");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { winner_auth, loser_auths } = req.body;

  if (!winner_auth || 
    typeof winner_auth !== "string" ||
    !Array.isArray(loser_auths)) {
      return res.status(400).send()
  }

  const winner_wins = await increment_win(db, winner_auth);

  if (!winner_wins.wins) {
    res.status(400).send({error: "Something went wrong"});
  }

  for (let loser of loser_auths) {
    increment_lose(db, loser);
  }

  console.log(winner_wins);
  return res.status(200).send(winner_wins);
}