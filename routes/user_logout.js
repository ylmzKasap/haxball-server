const update_timestamp = require("../database/functions/update_timestamp");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth } = req.body;

  if (!auth || typeof auth !== "string") {
      return res.status(400).send()
  }

  await update_timestamp(db, auth);
  return res.status(200).send();
}