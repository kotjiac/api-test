require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0'

const app = express();

//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, HOST, () => {
  console.log(`API-Test Listening on :: ${HOST}:${PORT}`);
});
