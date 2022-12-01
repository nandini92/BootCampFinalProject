const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const request = require('request-promise');
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const date = Date.now();

// Handler to create new Quest
const createQuest = async(req,res) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        let quest = {ownerId: req.params.ownerId, _id: uuidv4(), ...req.body, createdAt: date};
        await client.connect();

        // Geocode address
        if(quest.newMarker === false){
            const location = await request(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${quest.location}&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
            )
            .then((response) => JSON.parse(response))
            .then((parsedResponse) =>{ 
                return parsedResponse.results[0].geometry.location;
            })
            .catch((err) => res.status(400).json({status:400, data:quest, message: err}))

            quest = {...quest, location}; 
        // Reverse geocode coordinates
        } else if (quest.newMarker === true){
            const latlng = `${quest.location.lat},${quest.location.lng}`
            const address = await request(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
            )
            .then((response) => JSON.parse(response))
            .then((parsedResponse) =>{ 
                return parsedResponse.results[1].formatted_address;
            })
            .catch((err) => res.status(400).json({status:400, data:quest, message: err}))

            quest = {...quest, address}
        } else {
            return res.status(400).json({status:400, data:quest, message: "Address was not found."})
        }


        // 100 points of karma per difficulty level to be paid by owner
        const karma = quest.difficulty * 100;
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const user = await db.collection("users").findOne({_id: quest.ownerId});
        
        // If owner has insufficient karma points to create a quest with this difficulty level - reject the request.
        if(user.karma < karma){        
            return res.status(400).json({status:400, data:quest, message: "ERROR: Insufficient karma points to create this quest."});   
        }

        // If owner has sufficient karma points - deduct points from user.
        const ownerUpdated = await db.collection("users").updateOne({_id: quest.ownerId}, {$inc: {karma: -karma}, $set: {updatedAt: date}});

        if(ownerUpdated  === null){
            return res.status(400).json({status:400, message: "ERROR: Owner could not be updated."}); 
        }

        // Create new quest
        const questInserted = await db.collection("quests").insertOne({...quest, karma, completed: false});

        questInserted
        ? res.status(201).json({status:201, data:{...quest, karma}, message: "SUCCESS: New Quest created."})
        : res.status(400).json({status:400, message: "ERROR: Unable to create quest."}); 

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

        // Backend validation to verify if slot are available 
        const quest = await db.collection("quests").findOne({_id: req.params.id});

        // Throw error if no slots are available
        if(quest.participants === 0 ){
            return res.status(400).json({status:400, data:null, message: "ERROR: Quest is full. Unable to add user to quest."});   
        }

        // Add user id to the quest
        const questUpdated = await db.collection("quests").updateOne({_id: req.params.id}, { $set: {participants: participants,  updatedAt: date}, $push: {participantIds:  participant }});

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

        // Return owners karma points as quest was not completed.
        const quest = await db.collection("quests").findOne({_id: req.params.id});
        const ownerUpdated = await db.collection("users").updateOne({_id: quest.ownerId}, {$inc: {karma: quest.karma}, $set: {updatedAt: date}});

        // If owner was not updated, throw error
        if(ownerUpdated  === null){
            return res.status(400).json({status:400, data:quest, message: "ERROR: Owner's karma points were not returned!"}); 
        }

        // Delete quest
        const questDeleted = await db.collection("quests").deleteOne({_id: req.params.id});

        questDeleted
        ? res.status(200).json({status:200, data:quest, message: "SUCCESS: Quest deleted successfully."})
        : res.status(400).json({status:400, message: "ERROR: Unable to delete quest."})

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
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questUpdated = await db.collection("quests").updateOne({_id: req.params.id}, {$set: {completed: true, completedAt: date}});

        // Stop process if quest was not updated
        if(!questUpdated){
            client.close();
            console.log("database disconnected!")
            return res.status(400).json({status:400, data:questUpdated, message: "ERROR: Quest not updated."});
        }

        // Get Owner details to award task points as well. 
        // Get Participant details to award karma points and task points.
        const questDetails = await db.collection("quests").findOne({_id: req.params.id});

        const ownerUpdate = await db.collection("users").updateOne({_id: questDetails.ownerId}, {$inc: {taskPoints: questDetails.difficulty * 10}, $set: {updatedAt: date}});

        // Stop process if owner was not updated
        if(ownerUpdate === null){
            client.close();
            console.log("database disconnected!")
            return res.status(400).json({status:400, data:ownerUpdate, message: "ERROR: Owner was not awarded task points"});
        }

        const updatePromise = [];
        const karma = questDetails.karma/questDetails.participantIds.length;

        questDetails.participantIds.forEach((participant) => {
            updatePromise.push(db.collection("users").updateOne(
                {_id: participant} , {$inc: {karma: karma}, $inc: {taskPoints: questDetails.difficulty * 10}, $set: {updatedAt: date}}));
        })

        Promise.all(updatePromise)
        .then((response) => {
            client.close();
            console.log("database disconnected!")

            console.log(response);
            if (response.every(i => i !== null)){
                res.status(200).json({status:200, data:response, message: "SUCCESS: Quest has been marked as complete."});
            } else {
                res.status(400).json({status:400, data:response, message: "ERROR: Users were not awarded task points and karma."});
            }
        })
    }catch(err){
        console.log(err);
        client.close();
        console.log("database disconnected!")
        res.status(500).json({status:500, message: `ERROR: Internal server error.`});
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
        const user = req.params.id;
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const questsOwned = await db.collection("quests").find({ ownerId: user, completed: false}).toArray();
        
        const questsOn = await db.collection("quests").find({ participantIds: user, completed: false}).toArray();

        (questsOwned !== null && questsOn !== null)
            ? res.status(201).json({status:201, data: {questsOwned, questsOn}, message: "SUCCESS: All users quests returned."})
            : res.status(404).json({status:404, data: null, message: "ERROR: Data not found."})
         
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

        const quests = await db.collection("quests").find({completed: false}).toArray();

        quests
        ? res.status(201).json({status:201, data:quests, message: "SUCCESS: Quests returned."})
        : res.status(404).json({status:404, data:quests, message: "ERROR: Data not found."});    
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = {createQuest, addQuestParticipant, completeQuest, deleteQuest, getQuest, getUsersQuests, getAllQuests};