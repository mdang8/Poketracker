const express = require('express');
const bodyParser = require('body-parser');

const pokemon = require('./routes/pokemon');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/pokemon', pokemon);
app.use(express.static(__dirname + './../../'));
app.listen(3000);
