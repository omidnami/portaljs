import { BaseModel } from "../app/database/mysql/BaseModel";
import { mysqlConnection } from "../configs/database";
class Users extends BaseModel  {
  constructor() {
    mysqlConnection()
    super("users");
  }
}

export default Users;