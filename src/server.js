import express from 'express';
import path from 'node:path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
