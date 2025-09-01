// --------------------------backend/server.js--------------------------

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 10000; // Render asigna PORT automáticamente

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API route
app.use('/api/contact', contactRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const path = require('path');
// const contactRoute = require('./routes/contact');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // API route
// app.use('/api/contact', contactRoute);

// // Servir frontend estático
// const frontendPath = path.join(__dirname, '../frontend');
// app.use(express.static(frontendPath));

// // Para cualquier ruta no-API, devuelve el index.html (útil si navegas)
// app.get('*', (req, res, next) => {
//   if (req.path.startsWith('/api/')) return next(); // deja pasar rutas API
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

// // Content Security Policy (más permisiva para dev; ajusta en prod)
// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; connect-src 'self' http://localhost:3000"
//   );
//   next();
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });