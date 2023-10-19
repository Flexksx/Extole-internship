-- database: C:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db
-- Query to compute % of each source_type per quarter
WITH
    SourceTypeQuarterCounts AS (
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
            r.source_type AS "Source Type"
        FROM
            records AS r
            INNER JOIN periods AS p ON r.period_record_id = p.id
    )
SELECT
    Quarter,
    "Source Type",
    (COUNT(*) * 100.0) / SUM(COUNT(*)) OVER (
        PARTITION BY
            Quarter
    ) AS Percentage
FROM
    SourceTypeQuarterCounts
GROUP BY
    Quarter,
    "Source Type"
ORDER BY
    Quarter,
    "Source Type";
