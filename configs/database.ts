const mysql = require('mysql');

export default class Database {

    static mysqlConection () {
        if (process.env.MYSQL_STATUS === 'false') {
            console.log("mysql Desibled in env file");
            return false
        }
        const connection = mysql.createConnection({
        host     : process.env.MYSQL_HOST || 'localhost',
        user     : process.env.MYSQL_USER || 'db_user',
        password : process.env.MYSQL_PASS || '',
        database : process.env.MYSQL_NAME || 'db_name'
        });
        // connection.connect()
        // let res:any = null
        // connection.query('select * AS users', function (error:any, results:any, fields:any) {
        //     if (error) throw error;
        //     res = results[0]
        //     console.log('The solution is: ', fields);
        //   });
        return connection
    }
}