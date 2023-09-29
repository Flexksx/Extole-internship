function getClientDataQ1(clientID, callback) {
    const query = `SELECT
    *
FROM
    clients_periods
WHERE
    client_id = ? AND
    period_end BETWEEN '2023-01-01' AND '2023-03-01'`;

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

function getClientDataQ2(clientID, callback) {
    const query = `SELECT
    *
FROM
    clients_periods
WHERE
    client_id = ? AND
    period_end BETWEEN '2023-01-01' AND '2023-03-01'`;

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
function getClientDataQ3(clientID, callback) {
    const query = `SELECT
    *
FROM
    clients_periods
WHERE
    client_id = ? AND
    period_end BETWEEN '2023-01-01' AND '2023-03-01'`;

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
function getClientDataQ4(clientID, callback) {
    const query = `SELECT
    *
FROM
    clients_periods
WHERE
    client_id = ? AND
    period_end BETWEEN '2023-01-01' AND '2023-03-01'`;

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

module.exports={
    getClientDataQ1,
    getClientDataQ2,
    getClientDataQ3,
    getClientDataQ4,
    getClientData
};