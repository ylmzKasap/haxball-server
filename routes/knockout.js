const update_knockout = require("../database/functions/update_knockout");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth } = req.body;

  if (!auth || typeof auth !== "string") {
      return res.status(400).send()
  }

  await update_knockout(db, auth);
  return res.status(200).send();
}