import pandas as pd
import path
from datetime import datetime
import os

def get_clients(give_df=False):
    df = pd.read_csv("metricscontribution_rate_initiative_cross_client_data_1613_for_students.csv")
    if not give_df:
        return df.client_id.unique()
    else:
        return df, df.client_id.unique()

def create_clients_tables(delete_previous_files=False):
    df, clients = get_clients(give_df=True)
    if delete_previous_files:
        # Delete all files in the output directory if reset_files is True
        for filename in os.listdir(path.CLIENTS):
            file_path = os.path.join(path.CLIENTS, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
    for client in clients:
        client_specific_df=df[df["client_id"]==client][["period_end", "source", "source_type", "attribution", "customers"]]
        # client_specific_df = client_specific_df[["period_end", "source", "source_type", "attribution", "customers"]]
        client_specific_df["period_end"] = pd.to_datetime(client_specific_df["period_end"], format='mixed')
        client_specific_df.sort_values(by="period_end")
        client_specific_df.to_csv(path.CLIENTS+str(client), index= False)        