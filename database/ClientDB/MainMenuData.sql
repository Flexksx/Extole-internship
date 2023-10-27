-- database: c:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db
--contribution rate per client for month, difference for last 2 months, and for last 2 quarters
-- Use the ▷ button in the top right corner to run the entire file.
--[(09 - 08) / 08] * 100
WITH
    AverageContributions AS (
        SELECT
            c.client_id,
            SUM(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) = '09' THEN p.contribution_rate
                    ELSE 0
                END
            ) / COUNT(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) = '09' THEN p.contribution_rate
                END
            ) AS avg_contribution_rate_09,
            SUM(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) = '08' THEN p.contribution_rate
                    ELSE 0
                END
            ) / COUNT(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) = '08' THEN p.contribution_rate
                END
            ) AS avg_contribution_rate_08,
            SUM(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) IN ('04', '05', '06') THEN p.contribution_rate
                    ELSE 0
                END
            ) / COUNT(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) IN ('04', '05', '06') THEN p.contribution_rate
                END
            ) AS avg_contribution_rate_Q2,
            SUM(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) IN ('07', '08', '09') THEN p.contribution_rate
                    ELSE 0
                END
            ) / COUNT(
                CASE
                    WHEN SUBSTR(p.period_end, 6, 2) IN ('07', '08', '09') THEN p.contribution_rate
                END
            ) AS avg_contribution_rate_Q3
        FROM
            periods AS p
            JOIN clients AS c ON p.client_period_id = c.id
        WHERE
            SUBSTR(p.period_end, 6, 2) IN ('04', '05', '06', '07', '08', '09')
        GROUP BY
            c.client_id
    )
SELECT
    client_id,
    avg_contribution_rate_09,
    (
        (
            avg_contribution_rate_09 - avg_contribution_rate_08
        ) / avg_contribution_rate_08
    ) * 100 AS percentage_difference_09_vs_08,
    (
        (
            avg_contribution_rate_Q3 - avg_contribution_rate_Q2
        ) / avg_contribution_rate_Q2
    ) * 100 AS percentage_difference_Q3_vs_Q2
FROM
    AverageContributions
ORDER BY
    client_id;
