// import 'dotenv/config'
import { Sequelize } from 'sequelize'


//connects to central node
export const Node1 = new Sequelize('appointments', 'root', 'r4ET8bGjQFD9A5KcCaqBpUhS', {
    host: 'ccscloud.dlsu.edu.ph',
    port: 20117,
    dialect: 'mysql',
    logging: console.log()
});

//connects to Luzon node
export const Node2 = new Sequelize('appointments', 'root', 'r4ET8bGjQFD9A5KcCaqBpUhS', {
    host: 'ccscloud.dlsu.edu.ph',
    port: 20118,
    dialect: 'mysql',
    logging: console.log()
});

//connects to VisMin node
export const Node3 = new Sequelize('appointments', 'root', 'r4ET8bGjQFD9A5KcCaqBpUhS', {
    host: 'ccscloud.dlsu.edu.ph',
    port: 20119,
    dialect: 'mysql',
    logging: console.log()
});


async function setTimeoutTimes() {
    try {
        const res1 = await localConnection.query('SET SESSION wait_timeout=300');
        const res2 = await localConnection.query('SET SESSION interactive_timeout=300');
    } catch (err) {
        console.log('error changing timeout');
    }
}

setTimeoutTimes();
//add or remove comments for which node you want to connect to
/*


*/


export const Node1Appointments = Node1.define('appointments', {
    pxid: { type: Sequelize.STRING, allowNull: true },
    clinicid: { type: Sequelize.STRING, allowNull: true },
    doctorid: { type: Sequelize.STRING, allowNull: true },
    apptid: { type: Sequelize.STRING, allowNull: true, primaryKey: true },
    status: { type: Sequelize.STRING, allowNull: true },
    TimeQueued: { type: Sequelize.DATE(6), allowNull: true },
    QueueDate: { type: Sequelize.DATE, allowNull: true },
    StartTime: { type: Sequelize.DATE, allowNull: true },
    EndTime: { type: Sequelize.DATE, allowNull: true },
    type: { type: Sequelize.STRING, allowNull: true },
    isVirtual: { type: Sequelize.BOOLEAN, allowNull: true },
    hospitalname: { type: Sequelize.STRING, allowNull: true },
    City: { type: Sequelize.STRING, allowNull: true },
    Province: { type: Sequelize.STRING, allowNull: true },
    RegionName: { type: Sequelize.STRING, allowNull: true },
    gender: { type: Sequelize.STRING, allowNull: true },
    age: { type: Sequelize.INTEGER, allowNull: true },
    mainspecialty: { type: Sequelize.STRING, allowNull: true }
}, {
    tableName: 'appointments' // Make sure this matches your actual table name
});

export const Node2Appointments = Node2.define('appointments', {
    pxid: { type: Sequelize.STRING, allowNull: true },
    clinicid: { type: Sequelize.STRING, allowNull: true },
    doctorid: { type: Sequelize.STRING, allowNull: true },
    apptid: { type: Sequelize.STRING, allowNull: true, primaryKey: true },
    status: { type: Sequelize.STRING, allowNull: true },
    TimeQueued: { type: Sequelize.DATE(6), allowNull: true },
    QueueDate: { type: Sequelize.DATE, allowNull: true },
    StartTime: { type: Sequelize.DATE, allowNull: true },
    EndTime: { type: Sequelize.DATE, allowNull: true },
    type: { type: Sequelize.STRING, allowNull: true },
    isVirtual: { type: Sequelize.BOOLEAN, allowNull: true },
    hospitalname: { type: Sequelize.STRING, allowNull: true },
    City: { type: Sequelize.STRING, allowNull: true },
    Province: { type: Sequelize.STRING, allowNull: true },
    RegionName: { type: Sequelize.STRING, allowNull: true },
    gender: { type: Sequelize.STRING, allowNull: true },
    age: { type: Sequelize.INTEGER, allowNull: true },
    mainspecialty: { type: Sequelize.STRING, allowNull: true }
}, {
    tableName: 'appointments' // Make sure this matches your actual table name
});

export const Node3Appointments = Node3.define('appointments', {
    pxid: { type: Sequelize.STRING, allowNull: true },
    clinicid: { type: Sequelize.STRING, allowNull: true },
    doctorid: { type: Sequelize.STRING, allowNull: true },
    apptid: { type: Sequelize.STRING, allowNull: true, primaryKey: true },
    status: { type: Sequelize.STRING, allowNull: true },
    TimeQueued: { type: Sequelize.DATE(6), allowNull: true },
    QueueDate: { type: Sequelize.DATE, allowNull: true },
    StartTime: { type: Sequelize.DATE, allowNull: true },
    EndTime: { type: Sequelize.DATE, allowNull: true },
    type: { type: Sequelize.STRING, allowNull: true },
    isVirtual: { type: Sequelize.BOOLEAN, allowNull: true },
    hospitalname: { type: Sequelize.STRING, allowNull: true },
    City: { type: Sequelize.STRING, allowNull: true },
    Province: { type: Sequelize.STRING, allowNull: true },
    RegionName: { type: Sequelize.STRING, allowNull: true },
    gender: { type: Sequelize.STRING, allowNull: true },
    age: { type: Sequelize.INTEGER, allowNull: true },
    mainspecialty: { type: Sequelize.STRING, allowNull: true }
}, {
    tableName: 'appointments' // Make sure this matches your actual table name
});