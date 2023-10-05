import sqlite3

conn = sqlite3.connect(
    '/home/cristi/Documents/practica/database/ClientDB/Clients.db')


def get_client_ids(conn):
    query = "SELECT DISTINCT client_id FROM clients_periods"
    rows = conn.cursor().execute(query).fetchall()
    client_ids = [row[0] for row in rows]
    return client_ids


def get_client_sources(conn, client_id):
    client_ids = get_client_ids(conn)
    if client_id not in client_ids:
        raise ValueError("Client id not found")
    query = """
    WITH sources AS (
    SELECT
        CASE
            WHEN source LIKE '%mail%' THEN 'email'
            WHEN source LIKE '%footer%' THEN 'footer'
            WHEN source LIKE '%header%' THEN 'header'
            WHEN source LIKE '%popup%' THEN 'popup'
            WHEN source LIKE '%sidebar%' THEN 'sidebar'
            WHEN source LIKE '%confirm%' THEN 'confirmation'
            ELSE source
        END AS generalized_source,
        COUNT(customers) AS customer_count
    FROM records AS r
    INNER JOIN clients_periods AS cp ON cp.id = r.client_period_id
    WHERE client_id = ?
    GROUP BY generalized_source
)

SELECT
    generalized_source,
    customer_count
FROM sources;
"""
    rows = conn.cursor().execute(query, (client_id,)).fetchall()
    sources = [[row[0], row[1]] for row in rows]
    return sources

def get_similar_clients(client_id,sources,conn):
    similar_clients=[]
    query="""
    SELECT client_id,source
    FROM clients_periods AS cp
    INNER JOIN ON cp.id = r.client_period_id
    WHERE source LIKE ?
    """
    return similar_clients



client_ids = get_client_ids(conn)
sources=get_client_sources(conn,client_ids[0])
print(get_similar_clients(client_ids[0],sources,conn))
