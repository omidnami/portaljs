import { Pool, QueryResultRow } from 'pg';

let pool: Pool;

export function initializePool() {
  pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_name',
    password: 'password',
    port: 5432,
    max: 10, // تعداد اتصالات همزمان
    idleTimeoutMillis: 30000 // زمان انتظار برای اتصالات بیکار
  });
}

export async function query(sql: string, params?: any[]): Promise<any[]> {
  const client = await pool.connect();
  try {
    const res = await client.query<any>(sql, params);
    return res.rows;
  } finally {
    client.release();
  }
}

export async function closePool() {
  await pool.end();
}
