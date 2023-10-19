const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('/Users/vintuss/practica-1/database/ClientsDB/Clients.db', (err) => {
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
        clients AS c
    INNER JOIN periods AS p ON p.client_period_id = c.id
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
    const query = `SELECT *
    FROM clients AS c
    INNER JOIN periods AS p ON p.client_period_id = c.id
     WHERE client_id = ?;
     `;

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
    const query = `
        SELECT
            p.period_end,
            JSON_GROUP_ARRAY(JSON_OBJECT(
                'source', r.source,
                'source_type', r.source_type,
                'customers', r.customers,
                'contribution_rate', r.contribution_rate
            )) AS records
        FROM
            records AS r
        INNER JOIN periods AS p ON r.period_record_id = p.id
        INNER JOIN clients AS c ON c.id = p.client_period_id
        WHERE client_id = ?
        GROUP BY p.period_end
        ORDER BY p.period_end ASC;
    `;

    db.all(query, [clientID], (err, rows) => {
        if (err) {
            callback(err, null);
            console.log(err);
            return;
        }
        if (rows && rows.length > 0) {
            // Parse the JSON array into an array of objects
            rows.forEach((row) => {
                row.records = JSON.parse(row.records);
            });
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}


function getClientSourcesByQuarter(clientID, quarter, callback) {
    const query = `
    SELECT
    p.period_end,
    JSON_GROUP_ARRAY(JSON_OBJECT(
        'source', r.source,
        'source_type', r.source_type,
        'customers', r.customers,
        'contribution_rate', r.contribution_rate
    )) AS records
FROM
    records AS r
INNER JOIN periods AS p ON r.period_record_id = p.id
INNER JOIN clients AS c ON c.id = p.client_period_id
WHERE c.client_id = ? AND
p.period_end BETWEEN ? AND ?
GROUP BY p.period_end
ORDER BY p.period_end ASC;
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
            // Parse the JSON array into an array of objects
            rows.forEach((row) => {
                row.records = JSON.parse(row.records);
            });
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}


function getAllClientIDs(callback) {
    const query = "SELECT DISTINCT client_id FROM clients";
    db.all(query, [], (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        };
        if (rows && rows.length > 0) {
            const clientIDs = rows.map(row => row.client_id); // Extract client IDs from rows
            callback(null, clientIDs); // Return the array of client IDs
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