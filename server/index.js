const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
require("dotenv").config();

const PORT = 8000;
const domain = process.env.REACT_APP_AUTH0_DOM;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const googleMaps = process.env.REACT_APP_GOOGLE_MAPS_API;

express()
    .use(helmet())
    .use(morgan('tiny'))
    .get('/cred', function (req, res) {
        res.status(200).json({domain, clientId, googleMaps})
    })

    .listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });