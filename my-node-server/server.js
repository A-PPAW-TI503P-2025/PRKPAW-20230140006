const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/books'); 
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Home Page for API');
});

// Gunakan router buku
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}/`);
});
  
// Middleware untuk menangani 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
