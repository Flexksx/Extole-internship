-- database: c:\Users\liviu\Desktop\extole\practica\database\ClientDB\Clients.db

-- Use the ▷ button in the top right corner to run the entire file.

SELECT r.source, c.client_id, COUNT(*) AS attributes
FROM records AS r
JOIN clients AS c ON r.period_record_id = c.id
GROUP BY r.source, c.client_id;
