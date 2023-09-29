const express = require("express");
const app = express();
const IP_ADDRESS = '192.168.1.10'; // Replace with your local IP address
const cors = require("cors"); // Import the cors package
const {getClientDataQ1, getClientData, getClientDataQ2,getClientDataQ3,getClientDataQ4} = require("./database")


// Create a new SQLite database or open an existing one





app.use(cors());
app.get('/client-data/:clientID', (req, res) => {
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
app.get('/client-data/:clientID/quarter/Q1', (req,res)=>{
    const clientID=req.params.clientID;
    getClientDataQ1(clientID,(err,clientData)=>{
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (clientData.length > 0) {
            res.status(200).json(clientData);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
});

const PORT = 3000; // Choose a port number of your choice
app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server is running on ${IP_ADDRESS}:${PORT}`);
});
