import express from 'express';
import path from 'node:path';

const app = express();
const PORT = 3000;

app.use(express.static('dist'));

app.use('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});
