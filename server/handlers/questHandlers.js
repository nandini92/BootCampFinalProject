const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const quest = {ownerId: req.params.ownerId, ...req.body};
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questInserted = await db.collection("quests").insertOne(quest);
        console.log(questInserted);

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


const getAllQuests = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quests = await db.collection("quests").find().toArray();
        console.log(quests);
        
        quests
        ? res.status(200).json({status:200, data:quests, message: "SUCCESS: All Data returned."})
        : res.status(404).json({status:404, data:quests, message: "ERROR: Data not found."});         
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});  
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = {createQuest, getAllQuests};