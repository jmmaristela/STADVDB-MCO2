// const express = require('express');
import express from 'express';
import exphbs from 'express-handlebars';
const app = express();
import routes from './routes/routes.js';


app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

import { Node1 } from './dbconnection.js';
import { Node2 } from './dbconnection.js';
import { Node3 } from './dbconnection.js';

app.use('/static', express.static('public'));
app.use('/', routes);

async function initializeDB() {

    async function testConnection(sequelizeInstance, nodeName) {
        try {
            await sequelizeInstance.authenticate();
            console.log(`Connection has been established successfully to ${nodeName}.`);
            return true;
        } catch (error) {
            console.error(`Unable to connect to the ${nodeName}:`, error);
            return false;
        }
    }

    app.use(express.static('public'));

    const node1Status = await testConnection(Node1, 'Node1');
    const node2Status = await testConnection(Node2, 'Node2');
    const node3Status = await testConnection(Node3, 'Node3');

    const connectionStatus = {
        node1: node1Status,
        node2: node2Status,
        node3: node3Status
    };

    app.get('/connectionStatus', (req, res) => {
        res.json(connectionStatus);
    });

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