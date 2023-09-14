import pandas as pd
import clientprocessing



suitable_clients=clientprocessing.choose_suitable_clients(treshold=100)
print(len(suitable_clients))