const express = require('express');
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const segmentRoutes = require('./routes/segmentRoutes');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB Atlas Connected!'))
.catch((err) => {
  console.error(' MongoDB connection error:', err);
  process.exit(1);
});

const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Mount routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/segments', segmentRoutes); 


app.get('/', (req, res) => {
  res.send('Mini CRM Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});