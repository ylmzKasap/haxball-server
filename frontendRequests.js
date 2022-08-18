async function make_request(path, method, body, convertJson=false) {
  return fetch(`http://localhost:3001/${path}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    })
    .then((res) => convertJson ? res.json() : res);
}

room.onPlayerJoin = async (player) => {
  await make_request('user_login', 'POST', {
    auth: player.auth,
    username: player.name}
    ), true;
}

room.onGameStop = async () => {
  await make_request('game_end', 'POST', {
    winner_auth: "",
    loser_auths: []
  })
}

const get_user_info = async (playerAuth) => {
  const userInfo = await make_request('user_info', 'POST', {auth: playerAuth}, true);
  return userInfo;
}

const increment_knockout = async (playerAuth) => {
  await make_request('knockout', 'POST', {auth: playerAuth});
}

const set_admin = async (playerAuth, isAdmin, isSuperAdmin) => {
  await make_request('set_admin', 'POST', {
    auth: playerAuth,
    is_admin: isAdmin,
    is_super_admin: isSuperAdmin});
}