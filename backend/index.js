const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const layouts = require('express-ejs-layouts');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

//enable session
app.use(session({
    secret: 'sisapikey',
    cookie: {}
}));

const { Client } = require('pg')

const client = new Client({
  user: 'tevnbwjukzhcuu',
  host: 'ec2-54-84-98-18.compute-1.amazonaws.com',
  database: 'd9m48mnamvvvhs',
  password: '7a49fcba2a7e5cfe512d9548f81ecf772e98c1f13cd766e81230f0448e1bf8a3',
  port: 5432,
  ssl: {rejectUnauthorized: false},
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

// use layouts;
app.use(layouts);
app.set('layout', 'layouts/main.ejs', {username: 'sisapi'});
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//routes
const homeRouter        = require('./routes/home');
const catalogueRouter   = require('./routes/catalogue');
const loginRouter       = require('./routes/auth')
const mycarsRouter      = require('./routes/mycars');
const myrentsRouter     = require('./routes/myrents');
const profileRouter     = require('./routes/profile');

app.use('/'         , homeRouter);
app.use('/catalogue', catalogueRouter);
app.use('/auth'     , loginRouter);
app.use('/myrents'  , myrentsRouter);
app.use('/profile'  , profileRouter);

app.listen(3000);
console.log('Server runs at port 3000...');