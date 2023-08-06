const router = require("express").Router();
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const date = Date.now();


// TO DO: Set up evolution
const evolution = require("../assets/evolutions.json");


// Handler to create a new user upon Auth0 signup
router.post("/new-user", async(req,res) => {
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
})

// Store ratings from other users
router.patch("/user/:id", async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        // Get existing ratings (array) from users collection
        const currentRatings = await db.collection("users").findOne({_id: req.params.id});
        const { ratings } = req.body;
        let newRatings = {};

        // If first rating, push rating object as is
        if (currentRatings.ratings === undefined) {
            newRatings = ratings;
        // Calculate average between existing and new submission
        } else {
            newRatings = Math.floor((currentRatings.ratings + ratings)/2);
        }

        const update = await db.collection("users").updateOne({_id: req.params.id}, {$set: {updatedAt: date, ratings: newRatings}, $inc: {ratingsCount: 1}});
        console.log(update);

        update
        ? res.status(200).json({status:200, data: ratings, message: "SUCCESS: Ratings have been added."})
        : res.status(400).json({status:400, data: ratings, message: "ERROR: Failed to add ratings."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
})

// Handler to level users based on taskPoints accumulated
router.patch("/user-level/:id", async(req,res) => {
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
})

// Handler to return user details
router.post("/user",async(req,res) => {
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
})

// Handler to return user details based on id
router.get("/user/:id", async(req,res) => {
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
})

// Handler to return all user details
router.get("/users", async(req,res) => {
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
})

module.exports = router;