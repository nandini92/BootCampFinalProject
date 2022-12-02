const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const date = Date.now();

// Handler to create a new user upon Auth0 signup
const createUser = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const newUser = await db.collection("users").insertOne({...req.body, _id: uuidv4(), createdAt: date});

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

// Store ratings from other users
// TO DO: Calculate average score between previous score and new score
const addUserRatings = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const ratings = await db.collection("users").updateOne({_id: req.params.id}, {$set: {ratings: {...req.body.ratings},  updatedAt: date}});
        console.log(ratings);

        ratings
        ? res.status(200).json({status:200, data: ratings, message: "SUCCESS: Ratings have been added."})
        : res.status(400).json({status:400, data: ratings, message: "ERROR: Failed to add ratings."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to level users based on taskPoints accumulated
const updateUserLevel = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");
        console.log(req.params.id, req.body);

        const levelUpdate = await db.collection("users").updateOne({_id: req.params.id}, {$set: {level: req.body.level, updatedAt: date}});

        levelUpdate
        ? res.status(200).json({status:200, data: levelUpdate, message: "SUCCESS: Ratings have been added."})
        : res.status(400).json({status:400, data: levelUpdate, message: "ERROR: Failed to add ratings."});
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

// Handler to return user details based on id
const getUserById = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const user = await db.collection("users").findOne({_id: req.params.id});
        
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

module.exports = { createUser, addUserRatings, updateUserLevel, getUser, getUserById, getAllUsers };