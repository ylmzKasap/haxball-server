require('dotenv').config();
const { Pool } = require("pg");
const routes = require("./routes");
const database_connection = require("./database/database_connection");
const { teardown, setup } = require('./database/tests');

let database = new Pool({connectionString: database_connection});
const app = routes(database)

async function main () {
 /*  await teardown(database);
  await setup(database); */
} 

main();

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
