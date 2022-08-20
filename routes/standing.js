const knockout_ratio_standing = require("../database/functions/standings/knockout_ratio_standing");
const knockout_standing = require("../database/functions/standings/knockout_standing");
const lose_standing = require("../database/functions/standings/lose_standing");
const win_ratio_standing = require("../database/functions/standings/win_ratio_standing");
const win_standing = require("../database/functions/standings/win_standing");

module.exports = async (req, res) => {
  const db = req.app.get('database');
  const { auth, standing_type } = req.body;

  if (!auth || typeof auth !== "string"
    || !standing_type || typeof standing_type !== "string") {
      return res.status(400).send()
  }

  let userStanding = {};
  if (standing_type === "win_ratio") {
    userStanding = await win_ratio_standing(db, auth);
  } else if (standing_type === "knockout_ratio") {
    userStanding = await knockout_ratio_standing(db, auth);
  } else if (standing_type === "win") {
    userStanding = await win_standing(db, auth);
  } else if (standing_type === "knockout") {
    userStanding = await knockout_standing(db, auth);
  } else if (standing_type === "lose") {
    userStanding = await lose_standing(db, auth);
  } else {
    return res.status(400).send({error: "Invalid standing type"});
  }
  
  return res.status(200).send(userStanding);
}