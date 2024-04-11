//const express = require('express');
import express from 'express';// Your application logic here
const app = express();
const port = 3000;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

//import { Appointments, Node1Appointments } from './DBConn.js';
//comment out which node you dont need
import { Node1 } from './dbconnection.js';
import { Node2 } from './dbconnection.js';
import { Node3 } from './dbconnection.js';

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

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile('public/html/index.html', { root: __dirname });
});

// Route for serving the create.html file
app.get('/create', (req, res) => {
    res.sendFile('public/html/create.html', { root: __dirname });
});

// Route for serving the edit.html file
app.get('/edit', (req, res) => {
    res.sendFile('public/html/edit.html', { root: __dirname });
});

// Route for serving the show.html file
app.get('/show', (req, res) => {
    res.sendFile('public/html/show.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});