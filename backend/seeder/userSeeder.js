const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from parent directory (adjust path if needed)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const Customer = require('../src/models/Customer'); // Adjust path if needed

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

const sampleCustomers = [
  {
    name: 'Alice Sharma',
    email: 'alice@example.com',
    totalSpend: 1200.50,
    visits: 15,
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tags: ['vip', 'tech']
  },
  {
    name: 'Bob Singh',
    email: 'bob@example.com',
    totalSpend: 350.00,
    visits: 5,
    lastActive: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    tags: ['new', 'movies']
  },
  {
    name: 'Charlie Kumar',
    email: 'charlie@example.com',
    totalSpend: 760.75,
    visits: 8,
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tags: ['finance', 'tech']
  },
  {
    name: 'Daisy Kaur',
    email: 'daisy@example.com',
    totalSpend: 2200.00,
    visits: 22,
    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tags: ['vip', 'fashion', 'travel']
  },
  {
    name: 'Emma Dsouza',
    email: 'emma@example.com',
    totalSpend: 150.00,
    visits: 2,
    lastActive: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    tags: ['inactive', 'cooking']
  },
  {
    name: 'Farhan Ali',
    email: 'farhan@example.com',
    totalSpend: 980.00,
    visits: 13,
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    tags: ['tech', 'cricket']
  },
  {
    name: 'Geeta Patel',
    email: 'geeta@example.com',
    totalSpend: 450.00,
    visits: 6,
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    tags: ['fitness', 'fashion']
  },
  {
    name: 'Harsh Chauhan',
    email: 'harsh@example.com',
    totalSpend: 1750.00,
    visits: 18,
    lastActive: new Date(), // today
    tags: ['gaming', 'fitness', 'vip']
  },
  {
    name: 'Isha Verma',
    email: 'isha@example.com',
    totalSpend: 600.00,
    visits: 7,
    lastActive: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    tags: ['tech', 'reading']
  },
  {
    name: 'Jay Mehta',
    email: 'jay@example.com',
    totalSpend: 1950.00,
    visits: 20,
    lastActive: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    tags: ['finance', 'cricket', 'vip']
  }
];

const seedCustomers = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');

    await Customer.deleteMany();
    console.log('🗑️  Existing customers removed');

    await Customer.insertMany(sampleCustomers);
    console.log('✅ Sample customers inserted');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedCustomers();