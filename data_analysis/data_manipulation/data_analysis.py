import sqlite3

conn = sqlite3.connect(
    '/home/cristi/Documents/practica/database/ClientDB/Clients.db')


def get_client_ids(conn):
    query = "SELECT DISTINCT client_id FROM clients"
    rows = conn.cursor().execute(query).fetchall()
    client_ids = [row[0] for row in rows]
    return client_ids


def get_client_sources(conn, client_id):
    client_ids = get_client_ids(conn)
    if client_id not in client_ids:
        raise ValueError("Client id not found")
    query = """
    SELECT
        source,
        COUNT(customers) AS customer_count
    FROM records AS r
    INNER JOIN periods AS p ON p.id = r.period_record_id
    INNER JOIN clients AS c ON c.id = p.client_period_id
    WHERE client_id = ?
    GROUP BY source;
    """

    try:
        rows = conn.cursor().execute(query, (client_id,)).fetchall()
    except Exception as e:
        print(e)
    sources = [[row[0], row[1]] for row in rows]
    return sources


def get_similar_client_ids(client_id, sources, conn):
    similar_client_ids = []

    # Construct the SQL query
    placeholders = ", ".join(["?"] * len(sources))
    query = """
    SELECT
        c.client_id
    FROM clients AS c
    WHERE c.client_id != ?
    AND EXISTS (
        SELECT 1
        FROM records AS r
        INNER JOIN periods AS p ON p.id = r.period_record_id
        WHERE p.client_period_id = c.id
        AND r.source IN ({})
    )
    """.format(placeholders)

    # Execute the query
    params = [client_id] + sources
    cursor = conn.cursor()
    cursor.execute(query, params)

    # Extract client_ids
    similar_client_ids = [row[0] for row in cursor.fetchall()]

    return similar_client_ids


