-- database: C:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db
-- Query to calculate % for all source types for all time
WITH
    SourceTypeCounts AS (
        SELECT
            cp.source_type,
            COUNT(*) AS source_type_count
        FROM
            records AS cp
            INNER JOIN records AS r ON r.id = cp.id
        GROUP BY
            cp.source_type
    )
SELECT
    source_type,
    (source_type_count * 100.0) / SUM(source_type_count) OVER () AS percentage
FROM
    SourceTypeCounts;
