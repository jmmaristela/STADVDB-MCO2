// const express = require('express');
import express from 'express';
import exphbs from 'express-handlebars';
const app = express();

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { Node1 } from './dbconnection.js';
import { Node2 } from './dbconnection.js';
import { Node3 } from './dbconnection.js';


// Routing
app.get('/', (req, res) => {
    res.render('index');
});

async function initializeDB() {

    async function testConnection(sequelizeInstance, nodeName) {
        try {
            await sequelizeInstance.authenticate();
            console.log(`Connection has been established successfully to ${nodeName}.`);
        } catch (error) {
            console.error(`Unable to connect to the ${nodeName}:`, error);
        }
    }

    //comment out the connection to which node you dont need
    //testConnection(localConnection, 'Local Node');
    testConnection(Node1, 'Node1');
    testConnection(Node2, 'Node2');
    testConnection(Node3, 'Node3');


    //comment out the connection to which node you dont need
    //await localConnection.sync();
    await Node1.sync();
    await Node2.sync();
    await Node3.sync();
}

initializeDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// module.exports = app;