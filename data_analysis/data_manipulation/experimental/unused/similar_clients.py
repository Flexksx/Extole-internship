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
        c.client_id,
        COUNT(r.source) AS shared_sources_count
    FROM clients AS c
    INNER JOIN periods AS p ON p.client_period_id = c.id
    INNER JOIN records AS r ON r.period_record_id = p.id
    WHERE c.client_id != ?
    AND r.source IN ({})
    GROUP BY c.client_id
    HAVING COUNT(r.source) >= ? AND COUNT(r.source) <= ?
    """.format(placeholders)

    # Define the range of allowed shared sources
    min_sources = len(sources) - 2
    max_sources = len(sources) + 10

    # Execute the query
    params = [client_id] + sources + [min_sources, max_sources]
    cursor = conn.cursor()
    cursor.execute(query, params)

    # Extract client_ids
    similar_client_ids = [row[0] for row in cursor.fetchall()]

    return similar_client_ids






id='1446518931'
sources= get_client_sources(conn, id)
source_names = [source[0] for source in sources]
similar_ids=get_similar_client_ids(id, source_names, conn)
print(sources)
for similar_id in similar_ids:
    print(similar_id, get_client_sources(conn, similar_id))