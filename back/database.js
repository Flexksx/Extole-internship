const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('/home/cristi/Documents/practica/database/ClientDB/Clients.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the database.');
    }
});

function getClientDataByQuarter(clientID, quarter, callback) {
    let startDate, endDate;
    switch (quarter) {
        case 1:
            startDate = '2023-01-01';
            endDate = '2023-03-31';
            break;
        case 2:
            startDate = '2023-04-01';
            endDate = '2023-06-30';
            break;
        case 3:
            startDate = '2023-07-01';
            endDate = '2023-09-30';
            break;
        case 4:
            startDate = '2023-10-01';
            endDate = '2023-12-31';
            break;
        default:
            callback(new Error('Invalid quarter'), null);
            return;
    }

    const query = `SELECT
        period_end, contribution_rate
    FROM
        clients_periods
    WHERE
        client_id = ? AND
        period_end BETWEEN ? AND ?`;

    db.all(query, [clientID, startDate, endDate], (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    });
}

function getClientData(clientID, callback) {
    const query = "SELECT * FROM clients_periods WHERE client_id = ?";

    db.all(query, [clientID], (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}

function getClientSources(clientID, callback) {
    const query = `SELECT
    cp.period_end,
    r.source,
    r.source_type,
    r.customers,
    r.contribution_rate
FROM
    records as r
INNER JOIN clients_periods AS cp ON r.client_period_id = cp.id
WHERE client_id = ?
ORDER BY
    cp.period_end ASC,
    r.contribution_rate DESC;
`;
    db.all(query, [clientID], (err, rows) => {
        if (err) {
            callback(err, null);
            console.log(err); return;
        };
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}

function getClientSourcesByQuarter(clientID, quarter, callback) {
    const query = `SELECT
    cp.period_end,
    r.source,
    r.source_type,
    r.customers,
    r.contribution_rate
FROM
    records as r
INNER JOIN clients_periods AS cp ON r.client_period_id = cp.id
WHERE client_id = ? AND
    cp.period_end BETWEEN ? AND ?
ORDER BY
    cp.period_end ASC,
    r.contribution_rate DESC;
`;
    let startDate, endDate;
    switch (quarter) {
        case 1:
            startDate = '2023-01-01';
            endDate = '2023-03-31';
            break;
        case 2:
            startDate = '2023-04-01';
            endDate = '2023-06-30';
            break;
        case 3:
            startDate = '2023-07-01';
            endDate = '2023-09-30';
            break;
        case 4:
            startDate = '2023-10-01';
            endDate = '2023-12-31';
            break;
        default:
            callback(new Error('Invalid quarter'), null);
            return;
    }
    db.all(query, [clientID, startDate, endDate], (err, rows) => {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        }

        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []);
        }
    });
}


function getAllClientIDs(callback) {
    const query = "SELECT DISTINCT client_id FROM clients_periods";
    db.all(query, [], (err, rows) => {
        if (err) { callback(err, null); return; };
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}


module.exports = {
    getClientSourcesByQuarter,
    getClientDataByQuarter,
    getAllClientIDs,
    getClientSources,
    getClientData
};