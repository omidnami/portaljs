# Welcome to portaljs 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Build the app

   ```bash
    npm run build
   ```
3. Start the app

   ```bash
    npm start
   ```
4.Config .env file 

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## How to use mysql

select

   ```js
    const options = {
        select:"name, id",
        db:"users",
        where:"id = 1", //or where: "id = 1 and id = 2 and id = 3 and ..." // or where: "title LIKE %value%" // or where: "name IN ('Anil', 'Tina', 'Ravi')"
        orderBy: "name DESC"
    }
    Mysql.select(options, (res:any) => {

        console.log('result : ', res);
    })
    
   ```
insert

update

delete

check connection
