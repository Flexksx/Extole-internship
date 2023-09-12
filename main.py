import pandas as pd
from clientprocessing import create_clients_tables

df = pd.read_csv('metricscontribution_rate_initiative_cross_client_data_1613_for_students.csv')
# print(df)
create_clients_tables(delete_previous_files=True)