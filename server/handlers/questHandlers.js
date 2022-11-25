const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI, REACT_APP_GOOGLE_MAPS_API } = process.env;
const request = require('request-promise');

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

// Handler to get quest details based on quest id provided
const getQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quest = await db.collection("quests").findOne({_id: req.params.id})
        console.log(quest);

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

// Handler to get all quest details from database
// TO DO: Rework to limit response size
const getAllQuests = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const quests = await db.collection("quests").find().toArray();

        
        if(quests){
            const promises = [];

            // TODO: This can be done in Quest creation. Move when addQuest is complete.
            quests.forEach((quest) => { 
                const formattedLocation = `${quest.location.split(" ").join("+")}+${quest.city}`

                promises.push(
                    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedLocation},+CA&key=${REACT_APP_GOOGLE_MAPS_API}`)
                    .then(res => JSON.parse(res))
                    .then(res => {
                        const coordinates=res.results[0].geometry.location;
                        return {...quest, coordinates};
                    })
                );
            })

            Promise.all(promises)
            .then((data) => res.status(201).json({status:201, data, message: "SUCCESS: New Quest created."}))
        } else {
            res.status(404).json({status:404, data:quests, message: "ERROR: Data not found."});       
        }
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data:null, message: `ERROR: Internal server error.`});  
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = {createQuest, getQuest, getAllQuests};