import Mysql from "./MysqlApp"

export const ErrorSqlDesible = () => {return "Mysql is Desibled in the env file"}
export const ErrorSqlSelectTable = () => {return "please enter valide table name options = {table: 'TABLE_NAME'}"}
export const ErrorSqlConnection = () => {return "mysql not connected : please read log file"}
export const ErrorSqlTable = () => {return "mysql not connected to table : please read log file"}