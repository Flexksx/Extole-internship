import sqlite3
from sqlite3 import Error
import paths as p

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


def create_client_periods_table(conn):
    create_table_sql="""CREATE TABLE IF NOT EXISTS clients_periods (
	id INTEGER PRIMARY KEY,
	period_end TEXT NOT NULL,
	client_id TEXT NOT NULL,
	attributed_customers INTEGER,
	unattributed_customers INTEGER,
    contribution_rate REAL
);"""
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def create_records_table(conn):
    create_table_sql="""
    CREATE TABLE IF NOT EXISTS records(
        id INTEGER PRIMARY KEY,
        source TEXT NOT NULL,
        source_type TEXT NOT NULL,
        attributed BOOL,
        customers INTEGER
    );
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


conn = create_connection(p.DB)
create_client_periods_table(conn)
create_records_table(conn)