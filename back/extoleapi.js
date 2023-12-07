const express = require("express");
const app = express();
const IP_ADDRESS = '127.0.0.1'; // Replace with your local IP address
const cors = require("cors"); // Import the cors package
const { WeeklyData, MainMenuData, getClientSourcesByQuarter, getClientDataByQuarter, getClientData, getAllClientIDs, getClientSources, getSourcePercentageByQuarter } = require("./database");
const { log } = require("console");


// Create a new SQLite database or open an existing one

app.use(cors());

app.get('/api/client-data/:clientID', (req, res) => {
    const clientID = req.params.clientID;

    getClientData(clientID, (err, clientData) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientData.length > 0) {
            res.status(200).json(clientData);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});

app.get('/api/mainmenu', (req, res) => {
    MainMenuData((err, data) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            res.json(data);
        }
    });
});

app.get('/api/weekmenu', (req, res) => {
    WeeklyData((err, data) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            res.json(data);
        }
    });
});

app.get('/api/client-data/:clientID/quarter/:quarter', (req, res) => {
    const clientID = req.params.clientID;
    const quarter = req.params.quarter;
    let quarterNum;
    switch (quarter) {
        case 'Q1':
            quarterNum = 1;
            break;
        case 'Q2':
            quarterNum = 2;
            break;
        case 'Q3':
            quarterNum = 3;
            break;
        case 'Q4':
            quarterNum = 4;
            break;
        default:
            res.status(404).json({ message: 'Quarter not found' });
            return;
    }
    getClientDataByQuarter(clientID, quarterNum, (err, clientData) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientData.length > 0) {
            res.status(200).json(clientData);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});

app.get('/api/get-all-clients', (req, res) => {
    let clientIDs;
    getAllClientIDs((err, clientIDs) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientIDs.length > 0) {
            res.status(200).json(clientIDs);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});

app.get('/api/client-data/:clientID/sources', (req, res) => {
    const clientID = req.params.clientID;
    getClientSources(clientID, (err, clientSources) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientSources.length > 0) {
            res.status(200).json(clientSources);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});


app.get('/api/client-data/:clientID/quarter/:quarter/sources', (req, res) => {
    const clientID = req.params.clientID;
    const quarter = req.params.quarter;
    let quarterNum;
    switch (quarter) {
        case 'Q1':
            quarterNum = 1;
            break;
        case 'Q2':
            quarterNum = 2;
            break;
        case 'Q3':
            quarterNum = 3;
            break;
        case 'Q4':
            quarterNum = 4;
            break;
        default:
            res.status(404).json({ message: 'Quarter not found' });
            return;
    }
    getClientSourcesByQuarter(clientID, quarterNum, (err, clientData) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientData.length > 0) {
            res.status(200).json(clientData);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});
app.get('/api/sources/quarters/', (req, res) => {
    getSourcePercentageByQuarter((err, clientData) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientData.length > 0) {
            res.status(200).json(clientData);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});

const PORT = 2000; // Choose a port number of your choice


app.listen(PORT,IP_ADDRESS, () => {
    console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
});