const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Handler to create a new user upon Auth0 signup
const createUser = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const newUser = await db.collection("users").insertOne({...req.body, _id: uuidv4()});
        console.log(newUser);

        newUser
        ? res.status(200).json({status:200, data: newUser, message: "SUCCESS: User was created."})
        : res.status(500).json({status:500, data: newUser, message: "ERROR: User was not created."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to return user details
const getUser = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const user = await db.collection("users").findOne({email: req.body.email});
        
        user
        ? res.status(200).json({status:200, data:user, message: "SUCCESS: User details returned."})
        : res.status(404).json({status:404, data:user, message: "ERROR: User not found"});         
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});  
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to return all user details
const getAllUsers = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const users = await db.collection("users").find().toArray();
        
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

module.exports = { createUser, getUser, getAllUsers };