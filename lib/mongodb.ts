import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Type assertion since we've checked MONGODB_URI exists
const uri = MONGODB_URI as string;

// Enhanced connection options
const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
};

// Global type declaration
declare global {
  var _mongoClientPromise: Promise<MongoClient> | null;
}

// Initialize global promise
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the connection is preserved
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  const client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export async function getDb(dbName?: string) {
  try {
    const client = await clientPromise;
    
    // Simple ping to check connection
    await client.db().command({ ping: 1 });
    
    return client.db(dbName);
  } catch (error) {
    console.error('Failed to get database connection:', error);
    
    // Create a new client and try to connect
    const newClient = new MongoClient(uri, options);
    try {
      await newClient.connect();
      // Update the global promise with the new connection
      if (process.env.NODE_ENV === 'development') {
        global._mongoClientPromise = Promise.resolve(newClient);
      }
      clientPromise = Promise.resolve(newClient);
      return newClient.db(dbName);
    } catch (reconnectError) {
      console.error('Failed to reconnect:', reconnectError);
      throw reconnectError;
    }
  }
}

export default clientPromise;