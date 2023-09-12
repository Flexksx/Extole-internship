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
        # Delete all client directories and files if delete_previous_files is True
        for client_id in clients:
            client_directory = os.path.join(path.CLIENTS, str(client_id))
            if os.path.exists(client_directory):
                for filename in os.listdir(client_directory):
                    file_path = os.path.join(client_directory, filename)
                    if os.path.isfile(file_path):
                        os.remove(file_path)
                os.rmdir(client_directory)
    for client in clients:
        #Iterate through clients and create the dataframes 
        #with info only related to that specific client
        client_specific_df=df[df["client_id"]==client][["period_end", "source", "source_type", "attribution", "customers"]]
        #This was done to help the sorting algorithm, as 
        #it struggled with different time formats
        for index,clientser in client_specific_df.iterrows():
            clientser["period_end"]=clientser["period_end"][10:]
        client_specific_df = client_specific_df[["period_end", "source", "source_type", "attribution", "customers"]]
        client_specific_df["period_end"] = pd.to_datetime(client_specific_df["period_end"],utc=True, format='mixed').dt.strftime('%Y-%m-%d')
        client_specific_df=client_specific_df.sort_values(by="period_end")
        #Save the client df to a separate csv file
        filepath=path.CLIENTS+str(client)
        os.mkdir(filepath)
        client_specific_df.to_csv(filepath+"/"+"client_data.csv", index= False)        