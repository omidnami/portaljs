import { setDatabase, connect, disconnect, query } from '..';

export class BaseModel {
    protected tableName: string;
    private query: string = '';
    private conditions: string[] = [];
    private order: string = '';
    private group: string = '';
    private limit: string = '';

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    static async connectToDatabase(data: ConnectionInterface) {
        setDatabase('mysql');
        await connect(data);
    }

    static async disconnectFromDatabase() {
        await disconnect();
    }

    static select(fields: string | string[]) {
        const instance = new this('');
        instance.query = `SELECT ${Array.isArray(fields) ? fields.join(', ') : fields} FROM ${instance.tableName}`;
        return instance;
    }

    where(conditions: { [key: string]: any }) {
        const conditionStrings = Object.keys(conditions).map(key => `${key} ${conditions[key]}`);
        this.conditions.push(...conditionStrings);
        return this;
    }

    between(field: string, start: any, end: any) {
        this.conditions.push(`${field} BETWEEN '${start}' AND '${end}'`);
        return this;
    }

    orderBy(order: { [key: string]: 'ASC' | 'DESC' }) {
        const orderStrings = Object.keys(order).map(key => `${key} ${order[key]}`);
        this.order = `ORDER BY ${orderStrings.join(', ')}`;
        return this;
    }

    groupBy(fields: string | string[]) {
        this.group = `GROUP BY ${Array.isArray(fields) ? fields.join(', ') : fields}`;
        return this;
    }

    limitTo(limit: number) {
        this.limit = `LIMIT ${limit}`;
        return this;
    }

    async get<T>(): Promise<T[]> {
        let finalQuery = this.query;
        if (this.conditions.length) {
            finalQuery += ` WHERE ${this.conditions.join(' AND ')}`;
        }
        if (this.group) {
            finalQuery += ` ${this.group}`;
        }
        if (this.order) {
            finalQuery += ` ${this.order}`;
        }
        if (this.limit) {
            finalQuery += ` ${this.limit}`;
        }
        console.log(finalQuery); // برای نمایش کوئری ساخته شده
        return await query<T>(finalQuery); // اجرای کوئری و برگرداندن نتیجه
    }

    async create<T>(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        await query(sql, values);
    }

    async update<T>(id: number, data: Partial<T>): Promise<void> {
        const keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const values = Object.values(data);
        const sql = `UPDATE ${this.tableName} SET ${keys} WHERE id = ?`;
        await query(sql, [...values, id]);
    }

    async delete(id: number): Promise<void> {
        const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
        await query(sql, [id]);
    }

    static selectSum(field: string) {
        const instance = new this('');
        instance.query = `SELECT SUM(${field}) AS sum FROM ${instance.tableName}`;
        return instance;
    }

    static selectMax(field: string) {
        const instance = new this('');
        instance.query = `SELECT MAX(${field}) AS max FROM ${instance.tableName}`;
        return instance;
    }
}
