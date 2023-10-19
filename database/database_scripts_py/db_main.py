from db_scripts import *
from db_json_loader import *
import sqlite3


conn = create_connection(
    "C:\\Users\\liviu\\Desktop\\extole\\practica\\database\\ClientDB\\Clients.db")


drop_tables(conn)
create_clients_table(conn)
create_periods_table(conn)
create_records_table(conn)

print(list_tables(conn))
client_data, period_data, record_data = load_data_from_json(
    "C:\\Users\\liviu\\Desktop\\extole\\practica\\data_analysis\\clients_per_day.json")
print(client_data[0], period_data[0], record_data[0])
insert_to_clients(conn, client_data)
insert_to_periods(conn, period_data)
insert_to_records(conn, record_data)
