const update_admin = require("../database/functions/update_admin");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth, decision } = req.body;

  if (!auth || typeof auth !== "string"
    || typeof decision !== "boolean" ) {
      return res.status(400).send()
  }

  await update_admin(db, auth, decision);
  return res.status(200).send();
}