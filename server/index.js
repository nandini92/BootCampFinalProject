const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');

express()
    .use(helmet())
    .use(morgan('tiny'))
    .get('/', function (req, res) {
        res.send('Hello World')
    })

    .listen(8000);