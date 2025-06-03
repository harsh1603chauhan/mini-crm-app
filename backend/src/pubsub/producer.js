const redis = require('redis');

// Create Redis client with proper config
const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  }
});

// Handle connection errors
client.on('error', (err) => console.error('Redis Client Error', err));

// Ensure connection is awaited properly
(async () => {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// Export function to publish to Redis stream
exports.publishToStream = async (stream, data) => {
  try {
    await client.xAdd(stream, '*', data);
    console.log(`Published to stream ${stream}:`, data);
  } catch (err) {
    console.error(`Failed to publish to stream ${stream}:`, err);
  }
};
