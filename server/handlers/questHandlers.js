const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Handler to create new Quest
// TO DO: Data  validation prior to inserting
const createQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const quest = {ownerId: req.params.ownerId, _id: uuidv4(), ...req.body};
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questInserted = await db.collection("quests").insertOne(quest);

        questInserted
        ? res.status(201).json({status:201, data:quest, message: "SUCCESS: New Quest created."})
        : res.status(500).json({status:500, data:quest, message: "ERROR: Internal server error."});   
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to add participant to quest
const addQuestParticipant = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const participant = req.body.participant;
        const participants = req.body.participants;
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        // TO DO: Reduce participant slots on quest
        const questUpdated = await db.collection("quests").updateOne({_id: req.params.id}, { $set: {participants: participants}, $push: {participantIds:  participant }});

        questUpdated
        ? res.status(201).json({status:201, data:questUpdated, message: "SUCCESS: Quest has been updated."})
        : res.status(500).json({status:500, data:null, message: "ERROR: Internal server error."});   
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}
 
// Handler to create delete Quest (only if no participants)
const deleteQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questDeleted = await db.collection("quests").deleteOne({_id: req.params.id});

        questDeleted
        ? res.status(201).json({status:200, message: "SUCCESS: Quest deleted succesfully."})
        : res.status(500).json({status:500,  message: "ERROR: Internal server error."});   
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, message: `ERROR: Internal server error.`});
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to create complete Quest
const completeQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const date = Date.now();
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questUpdated = await db.collection("quests").updateOne({_id: req.params.id}, {$set: {completed: true, completedAt: date}});
        console.log(req.params.id, questUpdated);

        questUpdated
        ? res.status(201).json({status:200, data:questUpdated, message: "SUCCESS: Quest deleted succesfully."})
        : res.status(500).json({status:500, data:questUpdated, message: "ERROR: Internal server error."});   
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, message: `ERROR: Internal server error.`});
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to get quest details based on quest id provided
const getQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quest = await db.collection("quests").findOne({_id: req.params.id});

        quest
        ? res.status(201).json({status:201, data: quest, message: "SUCCESS: Quest details retrieved."})
        : res.status(404).json({status:404,  message: "ERROR: Data not found."});     

    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});  
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to get all user's quest details from database
const getUsersQuests = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quests = await db.collection("quests").find({ownerId: req.params.id}).toArray();

        quests
        ? res.status(201).json({status:201, data:quests, message: "SUCCESS: User's Quests returned."})
        : res.status(404).json({status:404, data:quests, message: "ERROR: Data not found."});    
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

// Handler to get all quest details from database
// TO DO: Rework to limit response size
const getAllQuests = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quests = await db.collection("quests").find().toArray();

        quests
        ? res.status(201).json({status:201, data:quests, message: "SUCCESS: Quests returned."})
        : res.status(404).json({status:404, data:quests, message: "ERROR: Data not found."});    
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = {createQuest, addQuestParticipant, completeQuest, deleteQuest, getQuest, getUsersQuests, getAllQuests};