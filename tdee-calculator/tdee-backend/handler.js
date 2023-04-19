const AWS = require("aws-sdk");
const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const { uploadDataToS3, queryAthena } = require("./helpers");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const s3 = new AWS.S3();
const athena = new AWS.Athena({ region: process.env.AWS_REGION });

app.get("/results", async (req, res) => {
    try {
        const results = await queryAthena(athena);
        res.status(200).json(results);
        // return{
        //     statusCode:200,
        //     headers:{
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(results)
        // }
    } catch (error) {
        console.error('Error fetching results: ', error);
        res.status(500).json({
            message: 'Error fetching results',
            error: error.message,
        });
        // return{
        //     statusCode: 500,
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         message: 'Error fetching results',
        //         error: error.message,
        //     }),
        // };
    }
});

app.post("/results", async (req, res) => {
    try {
        const data = req.body;
        await uploadDataToS3(s3, data);
        res.status(200).json({message:'Data saved'});
        // return{
        //     statusCode: 200,
        //     headers:{
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         message: 'Data saved',
        //     }),
        // };
    } catch (error) {
        console.error('Error in POST /results:', error);
        res.status(500).json({
            message: 'Error saving data',
            error: error.message,
        });
        // return{
        //     statusCode: 500,
        //     headers:{
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify({
        //         message: 'Error saving data',
        //         error: error.message,
        //     }),
        // };
    }
});

module.exports.results = serverless(app);

