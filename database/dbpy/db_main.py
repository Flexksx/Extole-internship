from db_connect import *
from db_json_loader import *





conn = create_connection("/home/cristi/Documents/practica/database/ClientDB/Clients.db")
create_client_periods_table(conn)
create_records_table(conn)
tables = list_tables(conn)
for table in tables:
    print(table)


load_from_json_to_db(conn)