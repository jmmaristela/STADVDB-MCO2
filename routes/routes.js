// routes.js
import { Router, request } from 'express';
import { Node1Appointments, Node2Appointments, Node3Appointments } from '../dbconnection.js';
import { Node1, Node2, Node3 } from '../dbconnection.js';
import bodyParser from 'body-parser'; // Import body-parser

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/view', (req, res) => {
    res.render('view');
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/create', (req, res) => {
    res.render('insert');
});

router.get('/result', (req, res) => {
    res.render('result');
});

router.get('/update', (req, res) => {
    res.render('update');
});

router.post('/submit', async(req, res) => {
    console.log('Request body:', req.body);
   
    const { pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, isVirtual, hospitalname,
        City, Province, RegionName, gender, age, mainspecialty } = req.body;

    const regionsForNode2 = ['National Capital Region (NCR)', 'Cordillera Administrative Region (CAR)', 'Ilocos Region (I)', 'Cagayan Valley (II)', 'Central Luzon (III)', 'CALABARZON (IV-A)', 'MIMAROPA (IV-B)', 'Bicol Region (V)'];
    const regionsForNode3 = ['Western Visayas (VI)', 'Central Visayas (VII)', 'Eastern Visayas (VIII)', 'Zamboanga Peninsula (IX)', 'Northern Mindanao (X)', 'Davao Region (XI)', 'SOCCSKSARGEN (Cotabato Region) (XII)', 'Caraga (XIII)', 'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'];

    const node1 = await Node1.transaction();
    const node2 = await Node2.transaction();
    const node3 = await Node3.transaction();

    try {
        const insertNode1 = await Node1Appointments.create({
            pxid: pxid,
            clinicid: clinicid,
            doctorid: doctorid,
            apptid: apptid,
            hospitalname: hospitalname,
            mainspecialty: mainspecialty,
            RegionName: RegionName,
            status: status,
            TimeQueued: TimeQueued,
            QueueDate: QueueDate,
            StartTime: StartTime,
            EndTime: EndTime,
            type: type,
            isVirtual: isVirtual,
            City: City,
            Province: Province,
            gender: gender,
            age: age
        }, { transaction: node1 },{
            fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
        });
        console.log('Successful', insertNode1);


        if(regionsForNode2.includes(req.body.RegionName)){
            const insertNode2 = await Node2Appointments.create({
                pxid: pxid,
                clinicid: clinicid,
                doctorid: doctorid,
                apptid: apptid,
                hospitalname: hospitalname,
                mainspecialty: mainspecialty,
                RegionName: RegionName,
                status: status,
                TimeQueued: TimeQueued,
                QueueDate: QueueDate,
                StartTime: StartTime,
                EndTime: EndTime,
                type: type,
                isVirtual: isVirtual,
                City: City,
                Province: Province,
                gender: gender,
                age: age
            },{ transaction: node2 },{
                fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
            });
            await node2.commit();
            await node3.commit();
            console.log('Successful', insertNode2);
        }
        if(regionsForNode3.includes(req.body.RegionName)){
            const insertNode3 = await Node3Appointments.create({
                pxid: pxid,
                clinicid: clinicid,
                doctorid: doctorid,
                apptid: apptid,
                hospitalname: hospitalname,
                mainspecialty: mainspecialty,
                RegionName: RegionName,
                status: status,
                TimeQueued: TimeQueued,
                QueueDate: QueueDate,
                StartTime: StartTime,
                EndTime: EndTime,
                type: type,
                isVirtual: isVirtual,
                City: City,
                Province: Province,
                gender: gender,
                age: age
            },{ transaction: node3 },{
                fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
            });
            await node3.commit();
            await node2.commit();
            console.log('Successful', insertNode3);
        }

        await node1.commit();
        if (regionsForNode2.includes(RegionName)) await node2.commit();
        if (regionsForNode3.includes(RegionName)) await node3.commit();

        res.sendStatus(200);
    } catch(err) {
        if (node1) await node1.rollback();
        if (regionsForNode2.includes(RegionName) && node2) await node2.rollback();
        if (regionsForNode3.includes(RegionName) && node3) await node3.rollback();

        console.log('Error inserting:', err);
        res.sendStatus(400);
    }
});

router.post('/updateform', async(req, res) => {
    Object.keys(req.body).forEach(key => {
        req.body[key] = req.body[key] === '' ? null : req.body[key];
    });

    const { apptidSearch } = req.body;
    
    if (!apptidSearch) {
        return res.status(400).send("Apptid to update appointment is missing or invalid.");
    }

    const { pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, isVirtual, hospitalname,
        City, Province, RegionName, gender, age, mainspecialty } = req.body;

    const regionsForNode2 = ['National Capital Region (NCR)', 'Cordillera Administrative Region (CAR)', 'Ilocos Region (I)', 'Cagayan Valley (II)', 'Central Luzon (III)', 'CALABARZON (IV-A)', 'MIMAROPA (IV-B)', 'Bicol Region (V)'];
    const regionsForNode3 = ['Western Visayas (VI)', 'Central Visayas (VII)', 'Eastern Visayas (VIII)', 'Zamboanga Peninsula (IX)', 'Northern Mindanao (X)', 'Davao Region (XI)', 'SOCCSKSARGEN (Cotabato Region) (XII)', 'Caraga (XIII)', 'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'];

    const node1 = await Node1.transaction();
    const node2 = await Node2.transaction();
    const node3 = await Node3.transaction();

    try {
        const updateNode1 = await Node1Appointments.update({
            pxid: pxid,
            clinicid: clinicid,
            doctorid: doctorid,
            apptid: apptid,
            hospitalname: hospitalname,
            mainspecialty: mainspecialty,
            RegionName: RegionName,
            status: status,
            TimeQueued: TimeQueued,
            QueueDate: QueueDate,
            StartTime: StartTime,
            EndTime: EndTime,
            type: type,
            isVirtual: isVirtual,
            City: City,
            Province: Province,
            gender: gender,
            age: age
        }, { where: {apptid: apptidSearch},}, 
            { transaction: node1 },
            { fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
        });
        await node1.commit();
        console.log('Successful', updateNode1);
        
        if(regionsForNode2.includes(req.body.RegionName)){
            const updateNode2 = await Node2Appointments.update({
                pxid: pxid,
                clinicid: clinicid,
                doctorid: doctorid,
                apptid: apptid,
                hospitalname: hospitalname,
                mainspecialty: mainspecialty,
                RegionName: RegionName,
                status: status,
                TimeQueued: TimeQueued,
                QueueDate: QueueDate,
                StartTime: StartTime,
                EndTime: EndTime,
                type: type,
                isVirtual: isVirtual,
                City: City,
                Province: Province,
                gender: gender,
                age: age
            }, {
                where: {
                    apptid: apptidSearch
                }},
                { transaction: node1 },
                { fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
        });
            await node2.commit();
            await node3.commit();
            console.log('Successful', updateNode2);
        }
        if(regionsForNode3.includes(req.body.RegionName)){
            const updateNode3 = await Node3Appointments.update({
                pxid: pxid,
                clinicid: clinicid,
                doctorid: doctorid,
                apptid: apptid,
                hospitalname: hospitalname,
                mainspecialty: mainspecialty,
                RegionName: RegionName,
                status: status,
                TimeQueued: TimeQueued,
                QueueDate: QueueDate,
                StartTime: StartTime,
                EndTime: EndTime,
                type: type,
                isVirtual: isVirtual,
                City: City,
                Province: Province,
                gender: gender,
                age: age
            }, {
                where: {
                    apptid: apptidSearch
                }},
                { transaction: node3 },
                {fields: ['pxid', 'clinicid', 'doctorid', 'apptid', 'status', 'TimeQueued', 'QueueDate', 'StartTime', 'EndTime', 'type', 'isVirtual', 'hospitalname', 'City', 'Province', 'RegionName', 'gender', 'age', 'mainspecialty']
            });
            await node2.commit();
            await node3.commit();
            console.log('Successful', updateNode3);
        }
        await node1.commit();
        if (regionsForNode2.includes(RegionName)) await node2.commit();
        if (regionsForNode3.includes(RegionName)) await node3.commit();

        res.sendStatus(200);
    } catch(err) {
        if (node1) await node1.rollback();
        if (regionsForNode2.includes(RegionName) && node2) await node2.rollback();
        if (regionsForNode3.includes(RegionName) && node3) await node3.rollback();

        console.log('Error updating appointment: ', err);
        res.sendStatus(400);
    }
});

export default router;
