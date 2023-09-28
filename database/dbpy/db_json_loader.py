import sqlite3
from sqlite3 import Error
import json


def load_from_json_to_db(conn):
    with open("/home/cristi/Documents/practica/clients.json",'r') as f:
        client_data=json.load(f)
    return client_data