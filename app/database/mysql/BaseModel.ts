// db/BaseModel.ts
export class BaseModel {
    protected tableName: string;
  
    constructor(tableName: string) {
      this.tableName = tableName;
    }
  
    static select(fields: string | string[]) {
      const instance = new this('');
      instance.query = `SELECT ${Array.isArray(fields) ? fields.join(', ') : fields} FROM ${instance.tableName}`;
      return instance;
    }
  
    private query: string = '';
  
    where(conditions: { [key: string]: any }) {
      const conditionStrings = Object.keys(conditions).map(key => `${key} = '${conditions[key]}'`);
      this.query += ` WHERE ${conditionStrings.join(' AND ')}`;
      return this;
    }
  
    async get<T>(): Promise<T[]> {
      // اینجا باید کد اجرای کوئری به دیتابیس را اضافه کنید
      console.log(this.query); // برای نمایش کوئری ساخته شده
      return []; // اینجا باید نتیجه کوئری را برگردانید
    }
  }
  