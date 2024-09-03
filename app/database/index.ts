// db/index.ts
import * as mysql from './mysql/mysql';
import * as postgresql from './postgresql/postgresql';
import * as mongodb from './mongodb/mongodb';
import * as sqlite from './sqlite/sqlite';
import * as sqlserver from './sqlserver/sqlserver';

type DatabaseModule = typeof mysql | typeof postgresql | typeof sqlserver;

const databases: { [key: string]: DatabaseModule } = {
  mysql,
  postgresql,
  sqlserver
  // mongodb,
  // sqlite,
};

let currentDb: DatabaseModule;

export function setDatabase(dbType: string) {
  if (!databases[dbType]) {
    throw new Error(`Database type ${dbType} is not supported.`);
  }
  currentDb = databases[dbType];
}

export async function connect(data:ConnectionInterface) {
  if (currentDb) {
    await currentDb.initializePool(data);
  } else {
    throw new Error('No database selected.');
  }
}

export async function disconnect() {
  if (currentDb) {
    await currentDb.closePool();
  }
}

export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  if (currentDb) {
    return await currentDb.query(sql, params);
  } else {
    throw new Error('No database selected.');
  }
}
