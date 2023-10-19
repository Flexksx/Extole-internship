import pandas as pd
import numpy as np


def get_source_names():
    df = pd.read_csv(
        "/home/cristi/Documents/practica/database/database_scripts_py/out.csv")
    df.drop(columns=['id', 'id.2', 'id.1', 'client_period_id',
            'period_record_id', 'contribution_rate'], inplace=True)
    df.rename(columns={'contribution_rate.1': 'cr'}, inplace=True)
    df["period_end"] = pd.to_datetime(df["period_end"])

    # Getting the sources names
    sources_names = (df.source.value_counts().where(
        df.source.value_counts() > 300).dropna().index.to_list())
    return sources_names



def get_source_ser(grouping_characteristic: str, source_name: str, operation: str):
    # Filtering the df
    df = pd.read_csv(
        "/home/cristi/Documents/practica/database/database_scripts_py/out.csv")
    df.drop(columns=['id', 'id.2', 'id.1', 'client_period_id',
            'period_record_id', 'contribution_rate'], inplace=True)
    df.rename(columns={'contribution_rate.1': 'cr'}, inplace=True)
    df["period_end"] = pd.to_datetime(df["period_end"])

    source_df = df[df.source == source_name]
    # Drop clients that cause spikes
    clients_to_drop = [1260877163, 1711416236,
                       546286232, 1751373551, 1181616550]
    source_df = source_df[~source_df['client_id'].isin(clients_to_drop)]
    df.set_index('period_end', inplace=True)
    if operation == 'mean':
        grouped_df = (source_df[grouping_characteristic].groupby(
            source_df['period_end']).mean())
    elif operation == 'sum':
        grouped_df = (source_df[grouping_characteristic].groupby(
            source_df['period_end']).sum())
    else:
        raise ValueError(
            "The operation must be either 'mean' or 'sum'.")
    return grouped_df


def correlate(ser1: pd.Series, ser2: pd.Series):
    corr = np.corrcoef(ser1, ser2)
    return corr
