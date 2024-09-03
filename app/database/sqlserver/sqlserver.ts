import { ConnectionPool } from 'mssql';

let pool: ConnectionPool;

export async function initializePool() {
  pool = new ConnectionPool({
    user: 'username',
    password: 'password',
    server: 'localhost',
    database: 'database_name',
    options: {
      encrypt: true, // برای Azure
      trustServerCertificate: true // برای توسعه محلی
    },
    pool: {
      max: 10, // تعداد اتصالات همزمان
      min: 0,
      idleTimeoutMillis: 30000
    }
  });

  await pool.connect();
}

export async function query(sql: string, params?: any[]): Promise<any[]> {
  const request = pool.request();
  params?.forEach((param, index) => {
    request.input(`param${index}`, param);
  });
  const result = await request.query<any>(sql);
  return result.recordset;
}

export async function closePool() {
  await pool.close();
}
