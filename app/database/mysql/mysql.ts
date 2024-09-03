// db/mysql/mysql.ts
import { createPool, Pool } from 'mysql2/promise';

let pool: Pool;

export function initializePool(data:ConnectionInterface) {
  pool = createPool({
    host: data.host,
    user: data.user,
    password: data.password,
    database: data.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log("sql connection ok");
  
}

export async function getConnection() {
  if (!pool) {
    throw new Error('Pool has not been initialized. Please call initializePool first.');
  }
  return await pool.getConnection();
}

export async function query(sql: string, params?: any[]): Promise<any[]> {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute<any[]>(sql, params);
    return results;
  } finally {
    connection.release();
    await closePool()
  }
}

export async function closePool() {
  if (pool) {
    await pool.end();
    console.log("sql disconnect ok");
    
  }
}
