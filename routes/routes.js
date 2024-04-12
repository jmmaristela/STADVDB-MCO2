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

router.post('/submit', async(req, res) => {
    console.log('insert called');
    console.log(req.body);
    console.log('Request body:', req.body);
   // const {pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, isVirtual, hospitalname, City, Province, RegionName, gender, age, mainspecialty
   // } = req.body;
    /*
    const pxid = request.body.pxid;
    const clinicid = request.body.clinicid;
    const doctorid = request.body.doctorid;
    const apptid = request.body.apptid;
    const status = request.body.status;
    const TimeQueued = request.body.TimeQueued;
    const QueueDate = request.body.QueueDate;
    const StartTime = request.body.StartTime;
    const  EndTime = request.body.EndTime;
    const type = request.body.type;
    const isVirtual = request.body.isVirtual;
    const hospitalname = request.body.hospitalname;
    const City = request.body.City;
    const Province = request.body.Province;
    const RegionName = request.body.RegionName;
    const gender = request.body.gender;
    const age =  request.body.age;
    const mainspecialty = request.body.mainspecialty;
    */
    //const { pxid, clinicid, doctorid, apptid, status, TimeQueued, QueueDate, StartTime, EndTime, type, isVirtual, hospitalname, City, Province, RegionName, gender, age, mainspecialty } = req.body;

    const {
        pxid,
        clinicid,
        doctorid,
        apptid,
        status,
        TimeQueued,
        QueueDate,
        StartTime,
        EndTime,
        type,
        isVirtual,
        hospitalname,
        City,
        Province,
        RegionName,
        gender,
        age,
        mainspecialty
    } = req.body;

    const node1 = await Node1.transaction();
    const node2 = await Node2.transaction();
    const node3 = await Node3.transaction();

    const regionsForNode2 = ['National Capital Region (NCR)', 'Cordillera Administrative Region (CAR)', 'Ilocos Region (I)', 'Cagayan Valley (II)', 'Central Luzon (III)', 'CALABARZON (IV-A)', 'MIMAROPA (IV-B)', 'Bicol Region (V)'];
    const regionsForNode3 = ['Western Visayas (VI)', 'Central Visayas (VII)', 'Eastern Visayas (VIII)', 'Zamboanga Peninsula (IX)', 'Northern Mindanao (X)', 'Davao Region (XI)', 'SOCCSKSARGEN (Cotabato Region) (XII)', 'Caraga (XIII)', 'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'];


    try {
        const insertNode1Appointment = await Node1Appointments.create({
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
        //await node1.commit();
        console.log('Successfully inserted appointment into central node ', insertNode1Appointment);


        if(regionsForNode2.includes(req.body.RegionName)){
            const insertNode2Appointment = await Node2Appointments.create({
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
            console.log('Successfully inserted appointment into luzon node ', insertNode2Appointment);
        }
        if(regionsForNode3.includes(req.body.RegionName)){
            const insertNode3Appointment = await Node3Appointments.create({
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
            console.log('Successfully inserted appointment into vismin node', insertNode3Appointment);
        }

        await node1.commit();
        if (regionsForNode2.includes(RegionName)) await node2.commit();
        if (regionsForNode3.includes(RegionName)) await node3.commit();

        res.sendStatus(200);
    } catch(err) {
        /*
        await node1.rollback();
        await node2.rollback();
        await node3.rollback();
        console.log('Error inserting appointment: ', err);
        res.sendStatus(400);
        */
        if (node1) await node1.rollback();
        if (regionsForNode2.includes(RegionName) && node2) await node2.rollback();
        if (regionsForNode3.includes(RegionName) && node3) await node3.rollback();

        console.log('Error inserting appointment: ', err);
        res.sendStatus(400);
    }
});


export default router;
