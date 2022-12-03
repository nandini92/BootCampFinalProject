const { MongoClient } = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const date = Date.now();

const createReport = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const newReport = await db.collection("reports").insertOne({report: req.body.report, userId: req.params.id, _id: uuidv4(), createdAt: date});

        newReport
        ? res.status(200).json({status:200, data: newReport, message: "SUCCESS: Report was created."})
        : res.status(400).json({status:400, data: newReport, message: "ERROR: Report was not created."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
}

const getAllReports = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const reports = await db.collection("reports").find().toArray();

        reports
        ? res.status(200).json({status:200, data: reports, message: "SUCCESS: Reports were returned."})
        : res.status(404).json({status:404, data: reports, message: "ERROR: No Reports found."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
}

const markReport = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("BootCamp_Final_Project");
        console.log("database connected!");

        const report = await db.collection("reports").updateOne({ _id: req.params.id, read: true, updatedAt: date});

        report
        ? res.status(200).json({status:200, data: report, message: "SUCCESS: Reports was marked as read."})
        : res.status(404).json({status:404, data: report, message: "ERROR: Report was not marked."});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500, data: null, message: `ERROR: Internal server error.`});
    }finally{
        client.close();
        console.log("database disconnected!")
    }
}

module.exports = { createReport, getAllReports, markReport }