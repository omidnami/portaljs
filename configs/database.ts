import { BaseModel } from "../app/database/mysql/BaseModel";

require('dotenv').config()

    export  const  mysqlConection = async () => {
        await BaseModel.connectToDatabase('mysql', {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test'
        });
    }
