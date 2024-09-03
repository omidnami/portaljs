import { MongoClient, Db } from 'mongodb';

let client: MongoClient;
let db: Db;

export async function initializePool() {
  client = new MongoClient('mongodb://localhost:27017', {
    maxPoolSize: 50, // حداکثر تعداد اتصالات در pool
    minPoolSize: 5,  // حداقل تعداد اتصالات در pool
    maxIdleTimeMS: 30000, // حداکثر زمان بیکاری یک اتصال قبل از بسته شدن
    waitQueueTimeoutMS: 5000, // حداکثر زمان انتظار برای یک اتصال آزاد
  });
  await client.connect();
  db = client.db('database_name');
}

export async function getConnection() {
  if (!client) {
    throw new Error('Pool has not been initialized. Please call initializePool first.');
  }
  return db;
}

export async function closePool() {
  if (client) {
    await client.close();
  }
}