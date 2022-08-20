const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const user_login = require('./routes/user_login');
const user_logout = require('./routes/user_logout');
const game_end = require('./routes/game_end');
const user_info = require('./routes/user_info');
const knockout = require('./routes/knockout');
const set_admin = require('./routes/set_admin');
const top_players = require('./routes/top_players');
const standing = require('./routes/standing');
const all_users = require('./routes/all_users');

module.exports = function getApp (db) {
  const app = express();
  app.set('database', db);

  app.use(cors());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/user_login', user_login);
  app.post('/user_logout', user_logout);
  app.get('/all_users', all_users);
  app.post('/user_info', user_info);
  app.post('/game_end', game_end);
  app.post('/knockout', knockout);
  app.post('/set_admin', set_admin);
  app.post('/top_players', top_players);
  app.post('/standing', standing);

  return app
}