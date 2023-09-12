import pandas as pd
import path

def get_clients(give_df=False):
    df = pd.read_csv("metricscontribution_rate_initiative_cross_client_data_1613_for_students.csv")
    if not give_df:
        return df.client_id.unique()
    else:
        return df, df.client_id.unique()

def create_clients_tables():
    df, clients = get_clients(give_df=True)
    for client in clients:
        client_specific_df=df[df["client_id"]==client]
        client_specific_df = client_specific_df[["period_end", "source", "source_type", "attribution", "customers"]]
        filename=path.CLIENTS+str(client)
        client_specific_df.to_csv(filename, index= False)        