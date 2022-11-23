const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getAllUsers = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const users = await db.collection("users").find().toArray();
        console.log(users);
        
        users
        ? res.status(200).json({status:200, data:users, message: "SUCCESS: All Data returned."})
        : res.status(404).json({status:404, data:users, message: "ERROR: Data not found."});         
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});  
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = { getAllUsers };