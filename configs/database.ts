import { BaseModel } from "../app/database/mysql/BaseModel";

require('dotenv').config()

    export  const  mysqlConnection = async () => {
        await BaseModel.connectToDatabase({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        });
    }
