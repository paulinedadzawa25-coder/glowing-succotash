import { MongoClient } from 'mongodb';
import * as crypto from 'crypto';
import * as tls from 'tls';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}


const uri = process.env.MONGODB_URI;

const secureContext = tls.createSecureContext({
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
});

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  secureContext
};

const client = new MongoClient(uri, options);



let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase(): Promise<MongoClient> {
  if (cachedClient) {
    return cachedClient;
  }

  if (!cachedPromise) {
    console.log('🔄 Attempting MongoDB connection...');
    cachedPromise = (async (): Promise<MongoClient> => {
      try {
        const client = new MongoClient(uri, options);
        await client.connect();
        
        // Test the connection
        await client.db().admin().ping();
        console.log('✅ MongoDB connected successfully!');
        
        cachedClient = client;
        return client;
      } catch (error: any) {
        console.error('❌ MongoDB connection failed:', error?.message ?? error);
        cachedPromise = null;
        throw error;
      }
    })();
  }

  return cachedPromise;
}