const get_top_x_players = require("../database/functions/get_top_x_players");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { order_type, limit } = req.body;

  if (typeof order_type !== "string"
    ||  !["wins", "loses", "knockouts"].includes(order_type)
    || typeof limit !== "number") {
      return res.status(400).send({error: "Invalid body"});
  }

  const topPlayers = await get_top_x_players(db, order_type, limit);
  return res.status(200).send(topPlayers);
}