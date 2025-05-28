const express = require('express');         // якщо "type":"module" в package.json
// або const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Сервінг статичних файлів з папки public
app.use(express.static('public'));

// Опціонально — додатковий API-роут
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});