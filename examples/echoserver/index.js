const express = require('express');

const app = express();
const URL = '/sdk/v1/auth';
const PORT = 9090;
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post(URL, (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT, () => console.log(`EchoServer started at ${PORT} port`));
