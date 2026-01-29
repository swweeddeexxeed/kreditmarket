module.exports = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
};
const { Client } = require('pg');
const config = require('./config');

const client = new Client(config);
client.connect();

// Выполнение запросов
client.query('SELECT * FROM users', (err, res) => {
  if (err) throw err;
  console.log(res.rows);
});

client.end();
const express = require('express');
const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
node server.js