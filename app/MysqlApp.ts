import Database from "../configs/database";
import { ErrorSqlDesible } from "./Error";

const connection = Database.mysqlConection()

export default class Mysql {


    static check = () => {
        connection.connect(function(err:any) {
            
        if (err){
            return 'Mysql ERROR to connection. please read log file'
        }else {
            return 'Mysql connected'
    
        }
        });
        // connection.end()
    }

    static select = (configs:any, callBack:CallableFunction) => {
        if (process.env.MYSQL_STATUS === 'false') {
            
            callBack(ErrorSqlDesible())
            return false
        }

            if (!configs.table) {
                callBack("please enter valide table name options = {table: 'TABLE_NAME'}")
                return false
            }
        const qry =`SELECT ${configs.select??'*'} FROM ${configs.table}  ${configs.where?'WHERE '+configs.where:''} ORDER BY ${configs.orderBy??'id DESC'};`;

        connection.connect((err:any) => {
            if (err) throw err;

            console.log("Connected!");

            connection.query(qry, async (err:any, results:any) => {
                if (err) throw err;

                callBack(results)
                 
                
            });
            connection.end();
            
        });
        // return res
        
    }

    static selectSum = (configs:any, callBack:CallableFunction) => {}

    static selectBetween = (configs:any, callBack:CallableFunction) => {
        const options = {
            where:"salary",
            between:"1000 and 7000"
        }
    }

    
    static insert = (configs:any, callBack:CallableFunction) => {}
    
    static updatet = (configs:any, callBack:CallableFunction) => {}
    
    static delete = (configs:any, callBack:CallableFunction) => {}

    static db = (configs:any, callBack:CallableFunction) => {}
}

