const get_user_info = require("../database/functions/get_user_info");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth } = req.body;

  if (!auth || typeof auth !== "string") {
      return res.status(400).send({"error": "Invalid parameters"})
  }

  const userInfo = await get_user_info(db, auth);

  if (!userInfo) {
    return res.status(400).send({"error": "User not found"});
  }

  return res.status(200).send(userInfo);
}