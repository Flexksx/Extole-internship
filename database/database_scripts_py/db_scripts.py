import sqlite3
from sqlite3 import Error


def drop_tables(conn):
    query = "SELECT name FROM sqlite_master WHERE type='table';"
    rows = conn.cursor().execute(query).fetchall()
    table_names = [row[0] for row in rows]
    table_names.remove("sqlite_sequence")
    for table_name in table_names:
        query = "DROP TABLE IF EXISTS "+table_name+";"
        try:
            conn.cursor().execute(query)
            print(f"Dropped table {table_name} successfully.")
        except Error as e:
            print(e)


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


def create_periods_table(conn):
    query = """
    CREATE TABLE IF NOT EXISTS periods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    period_end TEXT NOT NULL,
    attribution TEXT NOT NULL,
    total_customers INTEGER,
    contribution_rate REAL NOT NULL,
    client_period_id INTEGER NOT NULL,
    FOREIGN KEY (client_period_id) REFERENCES clients (id)
);
"""
    try:
        conn.cursor().execute(query)
    except Error as e:
        print(e)


def create_clients_table(conn):
    query = """
    CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id TEXT NOT NULL);
    """
    try:
        conn.cursor().execute(query)
    except Error as e:
        print(e)


def create_records_table(conn):
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    source_type TEXT NOT NULL,
    customers INTEGER,
    contribution_rate REAL,
    period_record_id INTEGER,  -- Rename the column to period_record_id
    FOREIGN KEY (period_record_id) REFERENCES periods (id)  -- Reference the periods table with id as the primary key
);
"""
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def list_tables(conn):
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        return [table[0] for table in tables]
    except sqlite3.Error as e:
        print("Error:", e)
        return []


def insert_to_clients(conn, data):
    insertion_str = """INSERT INTO clients (client_id) VALUES (?);"""
    cur = conn.cursor()
    cur.executemany(insertion_str, [(client_id,) for client_id in data])
    conn.commit()



def insert_to_periods(conn, data):
    insertion_str = """INSERT INTO periods (period_end, attribution, total_customers, contribution_rate, client_period_id) VALUES (?, ?, ?, ?, ?)"""
    cur = conn.cursor()
    cur.executemany(insertion_str, data)
    conn.commit()


def insert_to_records(conn, data):
    insertion_str = """INSERT INTO records (source, source_type, customers, contribution_rate, period_record_id) VALUES (?, ?, ?, ?, ?)"""
    cur = conn.cursor()
    cur.executemany(insertion_str, data)
    conn.commit()
