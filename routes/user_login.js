const add_user_database = require("../database/functions/add_user_database");
const get_user_info = require("../database/functions/get_user_info");
const update_timestamp = require("../database/functions/update_timestamp");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth, username } = req.body;

  if (!auth ||
    !username ||
    [auth, username].some(x => typeof x !== "string")) {
      return res.status(400).send()
  }

  const user_info = await get_user_info(db, auth);

  if (!user_info) {
    const newUserInfo = await add_user_database(db, auth, username);
    await update_timestamp(db, newUserInfo.user_auth);
    return res.status(200).send(newUserInfo);
  } else {
    await update_timestamp(db, user_info.user_auth);
    return res.status(200).send(user_info);
  }
}