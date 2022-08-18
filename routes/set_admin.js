const get_user_info = require("../database/functions/get_user_info");
const update_admin = require("../database/functions/update_admin");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth, is_admin, is_super_admin } = req.body;

  if (!auth || typeof auth !== "string") {
      return res.status(400).send()
  }

  const userInfo = await get_user_info(db, auth);

  if (!userInfo) {
    return res.status(400).send({error: "User does not exist"});
  }

  await update_admin(db, auth, is_admin, is_super_admin);
  return res.status(200).send();
}