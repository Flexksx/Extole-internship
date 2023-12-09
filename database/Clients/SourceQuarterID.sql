-- database: C:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db
-- Query for computing contribution per source per quarter by cliend id
WITH SourceQuarterContributions AS (
    SELECT
        CASE
            WHEN p.period_end >= '2023-01-01' AND p.period_end < '2023-04-01' THEN 'Quarter 1'
            WHEN p.period_end >= '2023-04-01' AND p.period_end < '2023-07-01' THEN 'Quarter 2'
            WHEN p.period_end >= '2023-07-01' AND p.period_end < '2023-10-01' THEN 'Quarter 3'
            WHEN p.period_end >= '2023-10-01' AND p.period_end < '2024-01-01' THEN 'Quarter 4'
            ELSE 'Unknown'
        END AS Quarter,
        r.source AS "Source",
        SUM(r.contribution_rate) AS TotalContribution
    FROM
        clients AS c
    INNER JOIN
        periods AS p ON p.client_period_id = c.id
    INNER JOIN
        records AS r ON r.period_record_id = p.id
    WHERE c.client_id = 21760749 -- Replace with the desired client ID
    GROUP BY Quarter, "Source"
)

SELECT
    Quarter,
    "Source",
    (TotalContribution * 100.0) / SUM(TotalContribution) OVER (PARTITION BY Quarter) AS Percentage
FROM SourceQuarterContributions
ORDER BY Quarter, "Source";
