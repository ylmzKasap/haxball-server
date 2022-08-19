const get_all_users = require("../database/functions/get_all_users");

module.exports = async (req, res) => {
  const db = req.app.get('database');

  const userInfo = await get_all_users(db);

  if (!userInfo) {
    return res.status(400).send({"error": "No user found"});
  }

  return res.status(200).send(userInfo);
}