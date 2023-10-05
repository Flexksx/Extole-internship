import sqlite3
from sqlite3 import Error
import json


def load_from_json_to_db(conn):
    with open("C:\Users\liviu\Desktop\extole\practica\data_analysis\clients_per_day.json",'r') as f:
        client_data=json.load(f)
    return client_data