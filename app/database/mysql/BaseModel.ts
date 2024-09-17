import { setDatabase, connect, disconnect, query } from '..';
import Validators from '../../ValidatorApp';

export class BaseModel {
    protected tableName: string;
    private query: string = '';
    private conditions: string[] = [];
    private order: string = '';
    private group: string = '';
    private limit: string = '';
    protected values: any[] = []; // تعریف values

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
    //select ok
    static select(fields: string | string[]) {
        const instance = new this('');
        instance.query = `SELECT ${Array.isArray(fields) ? fields.join(', ') : fields} FROM ${instance.tableName}`;
        return instance;
    }
    // where ok
    where(conditions: any[]) {
        const nonop = Validators.isNumber(conditions[1])?conditions[1]:`'${conditions[1]}'`
        const op = Validators.isNumber(conditions[2])?conditions[2]:`'${conditions[2]}'`
        const conditionStrings:string = conditions[0]+(conditions[2]?conditions[1]+' '+op:'='+nonop)
        console.log('where => ', conditions[0]+(conditions[2]?conditions[1]+conditions[2]:'='+conditions[1]));
        
        this.conditions.push(conditionStrings);
        return this;
    }

    async hasMany<T>(relatedModel: new () => BaseModel, foreignKey: string): Promise<T[]> {
        const results = await new relatedModel().select('*').where({ [foreignKey]: this.id }).get();
        return results;
    }

    async hasOne<T>(relatedModel: new () => BaseModel, foreignKey: string): Promise<T | null> {
        const relatedId = this[foreignKey];
        if (!relatedId) return null;

        const relatedInstance = new relatedModel();
        const results = await relatedInstance.select('*').where({ id: relatedId }).get();
        return results[0] || null;
    }
    //betwin ok
    between(field: string, start: any, end: any) {
        this.conditions.push(`${field} BETWEEN '${start}' AND '${end}'`);
        return this;
    }
    //order ok
    orderBy(order: { [key: string]: 'ASC' | 'DESC' }) {
        const orderStrings = Object.keys(order).map(key => `${key} ${order[key]}`);
        this.order = `ORDER BY ${orderStrings.join(', ')}`;
        return this;
    }
    //group ok
    groupBy(fields: string | string[]) {
        this.group = `GROUP BY ${Array.isArray(fields) ? fields.join(', ') : fields}`;
        return this;
    }
    //limit ok
    limitTo(limit: number) {
        this.limit = `LIMIT ${limit}`;
        return this;
    }
    // get ok
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
    //create ok
    async create<T>(data: Partial<T>): Promise<void> {
        const keys = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const sql = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
        await query(sql, values);
    }
    //update ok
    async update<T>(data: Partial<T>): Promise<any> {
        const keys = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const v:string[] = Object.values(data);
    
        // اطمینان از وجود شرایط
        if (this.conditions.length === 0) {
            throw new Error("No conditions specified for update.");
        }
    
        const sql = `UPDATE ${this.tableName} SET ${keys} WHERE ${this.conditions.join(' AND ')}`;        
        const res = await query(sql, [...v]); // ارسال مقادیر
            
        // Reset conditions and values for next query
        this.conditions = [];
        this.values = [];
        return res
    }
    //delete ok
    public async delete(): Promise<any> {
        const sql = `DELETE FROM ${this.tableName} WHERE ${this.conditions.join(' AND ')}`;
        const res = await query(sql); // ارسال مقادیر
            
        // Reset conditions and values for next query
        this.conditions = [];
        this.values = [];
        return res
    }

    async transaction<T>(callback: () => Promise<T>): Promise<T> {
        const connection = await getConnection();
        try {
            await connection.beginTransaction();
            const result = await callback();
            await connection.commit();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // sum ok
    static selectSum(field: string) {
        const instance = new this('');
        instance.query = `SELECT SUM(${field}) AS sum FROM ${instance.tableName}`;
        return instance;
    }
    // max ok
    static selectMax(field: string) {
        const instance = new this('');
        instance.query = `SELECT MAX(${field}) AS max FROM ${instance.tableName}`;
        return instance;
    }
    // first ok
    async first<T>(): Promise<T | null> {
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
            finalQuery += ` LIMIT 1`; // محدود کردن به یک ردیف
        }
    
        console.log(finalQuery); // برای نمایش کوئری ساخته شده
        const results = await query<T>(finalQuery); // اجرای کوئری و برگرداندن نتیجه
        return results[0] || null; // برگرداندن اولین نتیجه یا null
    }
}