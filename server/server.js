const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://placement-portal-bk43.onrender.com',
        /\.vercel\.app$/  // Allow any Vercel domain
      ]
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const placementRoutes = require('./routes/placementRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyVisitRoutes = require('./routes/companyVisitRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company-visits', companyVisitRoutes);



// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Placement Portal API is running!' });
});
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});