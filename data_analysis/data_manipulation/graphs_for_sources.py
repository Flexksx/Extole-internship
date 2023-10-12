import sqlite3
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Filtering the df
df = pd.read_csv(
    "/home/cristi/Documents/practica/database/database_scripts_py/out.csv")
df.drop(columns=['id', 'id.2', 'id.1', 'client_period_id',
        'period_record_id', 'contribution_rate'], inplace=True)
df.rename(columns={'contribution_rate.1': 'cr'}, inplace=True)
df["period_end"] = pd.to_datetime(df["period_end"])

# Getting the sources names
sources_names = (df.source.value_counts().where(
    df.source.value_counts() > 300).dropna().index.to_list())
source_name = 'direct'
source_df = df[df.source == source_name]
source_df = source_df[source_df['period_end'] != "2023-06-10T07:00:00+0000"]
grouped_source_df = (source_df['attribution'].groupby(
    source_df['period_end']).sum())

#Plotting the graph
x_axis = grouped_source_df.index
y_axis = grouped_source_df.values
plt.figure(figsize=(20, 10))
plt.plot(x_axis, y_axis)
plt.show()
