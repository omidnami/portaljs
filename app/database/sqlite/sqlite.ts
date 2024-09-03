import { Pool } from 'better-sqlite-pool';

let pool: Pool;

export function initializePool() {
    pool = new Pool('./database_name.db', {
        max: 5, // تعداد اتصالات همزمان
        timeout: 5000 // زمان انتظار برای اتصالات بیکار
    });
}

export async function query(sql: string, params?: any[]): Promise<any[]> {
    const db = await pool.acquire();
    try {
        const stmt = db.prepare(sql); // استفاده از connection
        const result = stmt.all(params);
        return result as any[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    } finally {
        db.release();
    }
}

export async function closePool() {
    try {
        await pool.close();
    } catch (error) {
        console.error('Error closing pool:', error);
    }
}