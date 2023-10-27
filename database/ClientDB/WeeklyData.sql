-- database: c:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db

-- Use the ▷ button in the top right corner to run the entire file.

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
    wd.week;
