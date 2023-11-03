const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('/users/vintuss/practica/database/ClientsDB/Clients.db', (err) => {
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
        INNER JOIN periods AS p ON c.id = p.client_period_id
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
    const query = "SELECT * FROM clients WHERE client_id = ?";

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
    p.period_endiod_end,
    r.source,
    r.source_type,
    r.customers,
    r.contribution_rate
FROM
    records AS r
    INNER JOIN periods AS p ON r.period_record_id = p.id
    INNER JOIN clients AS c ON p.client_period_id = c.id
WHERE client_id = ?
ORDER BY
    p.period_end ASC,
    r.contribution_rate DESC;
`;
    db.all(query, [clientID], (err, rows) => {
        if (err) {
            callback(err, null);
            console.log(err);
            return;
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
    p.period_end,
    r.source,
    r.source_type,
    r.customers,
    r.contribution_rate
FROM
    records as r
INNER JOIN periods AS p ON r.period_record_id = p.id
INNER JOIN clients AS c ON p.client_period_id = c.id
WHERE client_id = ? AND
    p.period_end BETWEEN ? AND ?
ORDER BY
    p.period_end ASC,
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

function MainMenuData(callback) {
    const query = `WITH AverageContributions AS (
    SELECT
    c.client_id,
        SUM(CASE WHEN SUBSTR(p.period_end, 6, 2) = '09' THEN p.contribution_rate ELSE 0 END) /
        COUNT(CASE WHEN SUBSTR(p.period_end, 6, 2) = '09' THEN p.contribution_rate END) AS avg_contribution_rate_09,
            SUM(CASE WHEN SUBSTR(p.period_end, 6, 2) = '08' THEN p.contribution_rate ELSE 0 END) /
            COUNT(CASE WHEN SUBSTR(p.period_end, 6, 2) = '08' THEN p.contribution_rate END) AS avg_contribution_rate_08,
                SUM(CASE WHEN SUBSTR(p.period_end, 6, 2) IN('04', '05', '06') THEN p.contribution_rate ELSE 0 END) /
                COUNT(CASE WHEN SUBSTR(p.period_end, 6, 2) IN('04', '05', '06') THEN p.contribution_rate END) AS avg_contribution_rate_Q2,
                    SUM(CASE WHEN SUBSTR(p.period_end, 6, 2) IN('07', '08', '09') THEN p.contribution_rate ELSE 0 END) /
                    COUNT(CASE WHEN SUBSTR(p.period_end, 6, 2) IN('07', '08', '09') THEN p.contribution_rate END) AS avg_contribution_rate_Q3
    FROM
            periods AS p
    JOIN
            clients AS c ON p.client_period_id = c.id
    WHERE
    SUBSTR(p.period_end, 6, 2) IN('04', '05', '06', '07', '08', '09')
        GROUP BY
    c.client_id
    )
    SELECT
    client_id,
        avg_contribution_rate_09,
        ((avg_contribution_rate_09 - avg_contribution_rate_08) / avg_contribution_rate_08) * 100 AS percentage_difference_09_vs_08,
            ((avg_contribution_rate_Q3 - avg_contribution_rate_Q2) / avg_contribution_rate_Q2) * 100 AS percentage_difference_Q3_vs_Q2
    FROM AverageContributions
    ORDER BY client_id`;

    db.all(query, (err, rows) => {
        if (err) {
            callback(err, null);
            console.log(err);
            return;
        };
        if (rows && rows.length > 0) {
            callback(null, rows);
        } else {
            callback(null, []); // No data found for the client
        }
    });
}

function WeeklyData(callback) {
    const query = `
        WITH WeeklyData AS (
            SELECT
                c.client_id,
                CAST(STRFTIME('%W', SUBSTR(p.period_end, 1, 10)) AS INTEGER) AS week,
                SUM(p.contribution_rate) AS total_contributions,
                COUNT(p.contribution_rate) AS contribution_count,
                SUM(p.attribution) AS attributed,
                SUM(p.total_customers) AS total_customers
            FROM
                periods AS p
            JOIN
                clients AS c ON p.client_period_id = c.id
            WHERE
                CAST(STRFTIME('%m', SUBSTR(p.period_end, 1, 10)) AS INTEGER) BETWEEN 1 AND 12
            GROUP BY
                c.client_id, week
        )
        SELECT
            wd.client_id,
            wd.week,
            COALESCE(wd.total_contributions / wd.contribution_count, 0) AS contribution_rate,
            COALESCE(wd.attributed, 0) AS attributed,
            COALESCE(wd.total_customers - wd.attributed, 0) AS unattributed
        FROM WeeklyData wd
        ORDER BY
            wd.week;`;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err); // Log the error for debugging
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

function getSourcePercentageByQuarter(callback) {
    const query = `WITH
    SourceQuarterCounts AS (
        SELECT
            CASE
                WHEN p.period_end >= '2023-01-01'
                AND p.period_end < '2023-04-01' THEN 'Quarter 1'
                WHEN p.period_end >= '2023-04-01'
                AND p.period_end < '2023-07-01' THEN 'Quarter 2'
                WHEN p.period_end >= '2023-07-01'
                AND p.period_end < '2023-10-01' THEN 'Quarter 3'
                WHEN p.period_end >= '2023-10-01'
                AND p.period_end < '2024-01-01' THEN 'Quarter 4'
                ELSE CAST(p.period_end AS TEXT)
            END AS Quarter,
            r.source AS "Source"
        FROM
            records AS r
            INNER JOIN periods AS p ON r.period_record_id = p.id
    )
SELECT
    Quarter,
    "Source",
    (COUNT(*) * 100.0) / SUM(COUNT(*)) OVER (
        PARTITION BY
            Quarter
    ) AS Percentage
FROM
    SourceQuarterCounts
GROUP BY
    Quarter,
    "Source"
ORDER BY
    Quarter,
    "Source";`
    db.all(query, [], (err, rows) => {
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



module.exports = {
    getClientSourcesByQuarter,
    getClientDataByQuarter,
    getAllClientIDs,
    getClientSources,
    getClientData,
    getSourcePercentageByQuarter,
    MainMenuData,
    WeeklyData
};