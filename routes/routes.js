import { Node1Appointments, Node2Appointments, Node2Appointments, Node1, Node2, Node3 } from '../dbconnection.js';
import { Router } from 'express';
import csvParser from 'csv-parser';
import fs from 'fs';
import { Sequelize } from 'sequelize';

const router = Router();
