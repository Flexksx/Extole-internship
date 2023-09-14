import pandas as pd
import path
from datetime import datetime
import os


def get_clients(give_df=False):
    """Return a list of all the client ids.

    Args:
        give_df (bool, optional): If true, it will return also the dataframe with all the data as second return variable. Defaults to False.

    Returns:
        list: in case that give_df is true, will return also a dtype object.
    """
    df = pd.read_csv(
        "metricscontribution_rate_initiative_cross_client_data_1613_for_students.csv")
    if not give_df:
        return df.client_id.unique()
    else:
        return df.client_id.unique(), df


def create_clients_dfs(delete_previous_files=False):
    """Creates unique dataframe with each client's data and stores it into a separate folder named by the client ID. 

    Args:
        delete_previous_files (bool, optional): Deletes all the previous files created. Maybe sometimes it will be useful. Defaults to False.
    """
    clients, df = get_clients(give_df=True)
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
        # Iterate through clients and create the dataframes
        # with info only related to that specific client
        client_specific_df = df[df["client_id"] == client][[
            "period_end", "source", "source_type", "attribution", "customers"]]
        # This was done to help the sorting algorithm, as
        # it struggled with different time formats
        for index, clientser in client_specific_df.iterrows():
            clientser["period_end"] = clientser["period_end"][10:]
        client_specific_df = client_specific_df[[
            "period_end", "source", "source_type", "attribution", "customers"]]
        client_specific_df["period_end"] = pd.to_datetime(
            client_specific_df["period_end"], utc=True, format='mixed').dt.strftime('%Y-%m-%d')
        client_specific_df = client_specific_df.sort_values(by="period_end")
        # Save the client df to a separate csv file
        filepath = path.CLIENTS+str(client)
        os.mkdir(filepath)
        client_specific_df.to_csv(filepath+"/"+"client_data.csv", index=False)


def create_client_stats():
    """Creates a clients_attributions.csv file in each client's folder. It contains a dataframe with period_end,attributed_customers,unattributed_customers
    """
    clients = get_clients()
    for client in clients:
        filepath = os.path.join(path.CLIENTS, str(client), "client_data.csv")
        clientdf = pd.read_csv(filepath)

        # Initialize dictionaries to store attributed and unattributed customer counts per period
        attributed_counts = {}
        unattributed_counts = {}

        periods = clientdf['period_end'].unique()

        for period in periods:
            # Filter the DataFrame for the current period and client
            period_df = clientdf[(clientdf['period_end'] == period)]

            # Count attributed and unattributed customers for the current period
            attributed_customers = period_df[period_df['attribution']
                                             == 'ATTRIBUTED']['customers'].sum()
            unattributed_customers = period_df[period_df['attribution']
                                               != 'ATTRIBUTED']['customers'].sum()

            # Store the counts in dictionaries with the period as the key
            attributed_counts[period] = attributed_customers
            unattributed_counts[period] = unattributed_customers

        # Create a DataFrame to store the client statistics
        stats_df = pd.DataFrame({
            'period_end': periods,
            'attributed_customers': [attributed_counts.get(period, 0) for period in periods],
            'unattributed_customers': [unattributed_counts.get(period, 0) for period in periods]
        })

        # Define the output directory for client statistics
        stats_output_directory = os.path.join(path.CLIENTS, str(client))
        os.makedirs(stats_output_directory, exist_ok=True)

        # Define the filename for the client statistics CSV file
        stats_filename = os.path.join(
            stats_output_directory, "client_attributions.csv")

        # Save the client statistics DataFrame to a CSV file
        stats_df.to_csv(stats_filename, index=False)


def choose_suitable_clients(treshold=50):
    """Return a list of clients id with more rows than a certain limit. The limit is given by the treshold.

    Args:
        treshold (int, optional): The treshold for customer records. Defaults to 50.

    Returns:
        list: A list with all client_ids that have more than 'treshold' rows in their dataframes.
    """
    suitable_clients = []
    if os.path.exists(path.CLIENTS):
        client_folders = [folder for folder in os.listdir(
            path.CLIENTS) if os.path.isdir(os.path.join(path.CLIENTS, folder))]
        for client_folder in client_folders:
            client_folder_path = os.path.join(path.CLIENTS, client_folder)
            folder_contents = os.listdir(client_folder_path)
            df = pd.read_csv(client_folder_path+'/'+folder_contents[0])
            if len(df) >= treshold:
                suitable_clients.append(str(client_folder))
                # print(f"Found suitable client '{str(client_folder)}'")
    return suitable_clients
