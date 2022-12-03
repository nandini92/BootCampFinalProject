const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const {MONGO_URI} = process.env;

const users = require("./users.json");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);
    const date = Date.now();

    const usersWithId = users.map(user => {return {...user, _id: uuidv4(), createdAt: date}});

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        console.log(`Users: ${usersWithId.length} items to be inserted to database`);
        const usersInsert = await db.collection("users").insertMany(usersWithId);

        console.log(usersInsert);
    }catch(err){
        console.log(err);
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

batchImport();