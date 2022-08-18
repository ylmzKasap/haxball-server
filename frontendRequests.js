room.onPlayerJoin = async (player) => {
  await fetch('http://localhost:3001/user_login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {auth: player.auth,
    username: player.name})
  }).then((res) => res.json())
}

room.onGameStop = async () => {
  await fetch('http://localhost:3001/game_end', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {winner_auth: "",
    loser_auths: []})
  })
}

await fetch('http://localhost:3001/user_info', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {auth: ""})
  }).then((res) => res.json())

await fetch('http://localhost:3001/knockout', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {auth: ""})
  })

await fetch('http://localhost:3001/set_admin', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
    {auth: "", is_admin: false, is_super_admin: false})
  })