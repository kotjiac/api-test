require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const PORT = process.env.PORT || 3333;
const HOST = process.env.HOST || '0.0.0.0'
var AWSXRay = require('aws-xray-sdk');

const app = express();

//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(AWSXRay.express.openSegment('AWSXRay: API-Test'));
app.use(routes);
app.use(AWSXRay.express.closeSegment());

app.listen(PORT, HOST, () => {
  console.log(`API-Test Listening on :: ${HOST}:${PORT}`);
});
