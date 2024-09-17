import { where } from "sequelize";
import { createQueue } from "../../configs/queue";
import Users from "../../models/UsersModel";
class ApiComponent {
    
   async index(req:any, res:any, next:any) {
        const users = await Users.select(['*'])
                    .where(['id', ">" , "5"])
                    .orderBy({id:"ASC"})
                    .first()
                    res.status(201).json({ message: users })

        // const users = await Users.select(['*'])
        // .between('user_registered', "2023-10-17 09:11:11", "2024-04-18 15:29:33")
        // .orderBy({id:"DESC"}).get()

                // const users = await Users.select(['*'])
                //                     .groupBy("user_status")
                //                     .orderBy({id:"ASC"}).get()
                // try {
                //     const userData = {
                //         user_nicename: "090245826",
                //         user_email: "omid@hh.com",
                //         // سایر فیلدها...
                //     };
            
                //     await new Users().create(userData); // ایجاد یک نمونه از Users و استفاده از متد create
                //     res.status(201).json({ message: 'User created successfully' });
                // } catch (error) {
                //     console.error('Error creating user:', error);
                //     next(error); // مدیریت خطا
                // }


                // try {
                //     const userData = {
                //         user_nicename: "0902458260",
                //         user_email: "omid@hh.com",
                //         user_status: 320
                //         // سایر فیلدها...
                //     };
            
                //    const result = await new  Users().where(['id','>', 18]).update(userData); // ایجاد یک نمونه از Users و استفاده از متد create
                //     res.status(201).json({ message: result });
                // } catch (error) {
                //     console.error('Error creating user:', error);
                //     next(error); // مدیریت خطا
                // }

                // try {
            
                //    const result = await new  Users().where(['id', 3]).delete(); // ایجاد یک نمونه از Users و استفاده از متد create
                //     res.status(201).json({ message: result });
                // } catch (error) {
                //     console.error('Error creating user:', error);
                //     next(error); // مدیریت خطا
                // }

                // try {
            
                //     const result = await Users.selectSum('user_status').get() // ایجاد یک نمونه از Users و استفاده از متد create
                //      res.status(201).json({ message: result });
                //  } catch (error) {
                //      console.error('Error creating user:', error);
                //      next(error); // مدیریت خطا
                //  }

                
                // try {
            
                //     const result = await Users.selectMax('user_status').first() // ایجاد یک نمونه از Users و استفاده از متد create
                //      res.status(201).json({ message: result });
                //  } catch (error) {
                //      console.error('Error creating user:', error);
                //      next(error); // مدیریت خطا
                //  }

        // res.json('ok')
    }

    test(req:any, res:any) {
        createQueue({name:'test',data:null})        
        res.send('test router')
    }

    async id(req:any, res:any){  


            const emailOption = {   
                from: "info@omid-nami.ir",
                to: "omid.nami.110@gmail.com",
                subject: "hello test",
                text: "hello world",
                html: "<h1>dear omid nami</h1>"+
                "<p>good!</p>"
            }
            
            createQueue({name:'email',data:emailOption});
            
            
        res.json('mail send')
    }

}

export default ApiComponent