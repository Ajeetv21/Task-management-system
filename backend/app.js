const express = require('express');
require('dotenv').config();
const app = express();
const connnectDb = require('./config/db');
const authRoute = require("./routes/authRoute")
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use('/api',authRoute)
// Connect to database
connnectDb();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
