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
    WITH sources AS (
    SELECT
        CASE
            WHEN source LIKE '%mail%' THEN 'mail'
            WHEN source LIKE '%footer%' THEN 'footer'
            WHEN source LIKE '%header%' THEN 'header'
            WHEN source LIKE '%popup%' THEN 'popup'
            WHEN source LIKE '%sidebar%' THEN 'sidebar'
            WHEN source LIKE '%confirm%' THEN 'confirm'
            WHEN source LIKE '%holiday%' THEN 'holiday'
            WHEN source LIKE '%friend%' THEN 'friend_referal'
            WHEN source LIKE '%referral_page%' THEN 'referal_page'
            WHEN source LIKE '%app-settings%' THEN 'app-settings'
            WHEN source LIKE '%app%' THEN 'app'
            WHEN source LIKE '%banner%' THEN 'banner'
            WHEN source LIKE '%widget%' THEN 'widget'
            WHEN source LIKE '%reward%' THEN 'reward'
            WHEN source LIKE '%checkout%' THEN 'checkout'
            WHEN source LIKE '%refer%' THEN 'refer'
            WHEN source LIKE '%business%%partner%' THEN 'business_partner'
            WHEN source LIKE '%newsletter%' THEN 'newsletter'
            WHEN source LIKE '%account%%page%' THEN 'account_page'
            WHEN source LIKE '%gift%%card%' THEN 'gift_card'
            WHEN source LIKE '%announcement%' THEN 'announcement'
            WHEN source LIKE '%milestone%' THEN 'milestone'
            WHEN source LIKE '%navbar%' THEN 'navbar'
            WHEN source LIKE '%share%' THEN 'share'
            WHEN source LIKE '%link%' THEN 'link'
            WHEN source LIKE '%overlay%' THEN 'overlay'
            WHEN source LIKE '%my%%account%' THEN 'my_account'
            WHEN source LIKE '%survey%' THEN 'survey'
            WHEN source LIKE '%share%' THEN 'share'
            WHEN source LIKE '%offer%%tab%' THEN 'offer_tab'
            WHEN source LIKE '%bar%' THEN 'bar'
            WHEN source LIKE '%welcome%' THEN 'welcome'
            WHEN source LIKE '%social%' THEN 'social'
            WHEN source LIKE '%tv%' THEN 'tv'
            WHEN source LIKE '%home%%page%' THEN 'home_page'
            WHEN source LIKE '%main%%site%' THEN 'home_page'
            WHEN source LIKE '%sms%' THEN 'sms'
            ELSE source
        END AS generalized_source,
        COUNT(customers) AS customer_count
    FROM records AS r
    INNER JOIN periods AS p ON p.id = r.period_record_id
    INNER JOIN clients AS c ON c.id = p.client_period_id
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


def get_similar_client_ids(client_id, sources, conn):
    similar_client_ids = []

    # Construct the SQL query
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
        AND CASE
            WHEN source LIKE '%overlay%' THEN 'overlay'
            WHEN source LIKE '%navbar%' THEN 'navbar'
            WHEN source LIKE '%mail%' THEN 'mail'
            WHEN source LIKE '%footer%' THEN 'footer'
            WHEN source LIKE '%header%' THEN 'header'
            WHEN source LIKE '%popup%' THEN 'popup'
            WHEN source LIKE '%sidebar%' THEN 'sidebar'
            WHEN source LIKE '%confirm%' THEN 'confirm'
            WHEN source LIKE '%holiday%' THEN 'holiday'
            WHEN source LIKE '%friend%' THEN 'friend_referal'
            WHEN source LIKE '%referral_page%' THEN 'referal_page'
            WHEN source LIKE '%app-settings%' THEN 'app-settings'
            WHEN source LIKE '%app%' THEN 'app'
            WHEN source LIKE '%banner%' THEN 'banner'
            WHEN source LIKE '%widget%' THEN 'widget'
            WHEN source LIKE '%reward%' THEN 'reward'
            WHEN source LIKE '%checkout%' THEN 'checkout'
            WHEN source LIKE '%refer%' THEN 'refer'
            WHEN source LIKE '%business_partner_%' THEN 'business-partner'
            WHEN source LIKE '%newsletter%' THEN 'newsletter'
            WHEN source LIKE '%account%%page%' THEN 'account_page'
            WHEN source LIKE '%gift%%card%' THEN 'gift_card'
            WHEN source LIKE '%share%' THEN 'share'
            WHEN source LIKE '%link%' THEN 'link'
            WHEN source LIKE '%announcement%' THEN 'announcement'
            WHEN source LIKE '%milestone%' THEN 'milestone'
            WHEN source LIKE '%my%%account%' THEN 'my_account'
            WHEN source LIKE '%survey%' THEN 'survey'
            WHEN source LIKE '%offer%%tab%' THEN 'offer_tab'
            WHEN source LIKE '%bar%' THEN 'bar'
            WHEN source LIKE '%welcome%' THEN 'welcome'
            WHEN source LIKE '%social%' THEN 'social'
            WHEN source LIKE '%tv%' THEN 'tv'
            WHEN source LIKE '%main%%site%' THEN 'home_page'
            WHEN source LIKE '%home%%page%' THEN 'home_page'
            WHEN source LIKE '%sms%' THEN 'sms'
                ELSE r.source
            END IN ({})
    )
    """.format(", ".join("?" * len(sources)))

    # Execute the query
    params = [client_id] + sources
    rows = conn.cursor().execute(query, params).fetchall()

    # Extract client_ids
    similar_client_ids = [row[0] for row in rows]

    return similar_client_ids


client_ids = get_client_ids(conn)
client_similarities = {}
for client_id in client_ids:
    client_sources = get_client_sources(conn, client_id)
    client_source_names = []
    for source in client_sources:
        client_source_names.append(source[0])
    similar_client_ids = get_similar_client_ids(
        client_id, client_source_names, conn)
    for similar_client in similar_client_ids:
        similar_client_sources = get_client_sources(conn, similar_client)
        similar_client_sources_names=[similar_client_source[0] for similar_client_source in similar_client_sources]
        if all(source in similar_client_sources_names for source in client_source_names):
            print(client_id, similar_client)
