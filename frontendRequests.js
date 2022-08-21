const user_login = async (player) => {
  await make_request('user_login', 'POST', {
    auth: player.auth,
    username: player.name.match(/\s\([^\(\)]*\)$/) 
      ? player.name.replace(player.name.match(/\s\([^\(\)]*\)$/)[0], "")
      : player.name}
    , true);
}

const get_all_users = async () => {
  const usersInfo = await make_request('all_users', 'GET', undefined, true);
  return usersInfo;
}

const get_user_info = async (playerAuth) => {
  const userInfo = await make_request('user_info', 'POST', {auth: playerAuth}, true);
  return userInfo;
}

const increment_win_lose = async (winner_auth, loser_auths) => {
  return await make_request('game_end', 'POST', {
    winner_auth: winner_auth,
    loser_auths: loser_auths
  }, true);
}

const increment_knockout = async (playerAuth) => {
  await make_request('knockout', 'POST', {auth: playerAuth});
}

const set_admin = async (playerAuth, isAdmin, isSuperAdmin) => {
  await make_request('set_admin', 'POST', {
    auth: playerAuth,
    is_admin: isAdmin, // set true to give admin rights, false to take it away.
    is_super_admin: isSuperAdmin});
}

const get_top = async (orderType, limit) => {
  return await make_request('top_players', 'POST', {
    order_type: orderType, // 'knockouts', 'wins' or 'loses'
    limit: limit}, true); // get top 'x' players
}

const get_standing = async (auth, standing_type) => {
  return await make_request('standing', 'POST', {
    auth: auth,
    standing_type: standing_type
  }, true);
}