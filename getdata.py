import pandas as pd
from datetime import datetime
import json

def get_clients_json():
    with open("clients.json",'r') as f:
        json_string = f.read()
    clients=json.loads(json_string)
    return clients

