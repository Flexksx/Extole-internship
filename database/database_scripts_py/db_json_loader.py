import json


def load_data_from_json(file_path):
    client_data = []
    period_data = []
    record_data = []
    client_index = 0
    period_index = 0
    with open(file_path, 'r') as f:
        client_json = json.load(f)
    for client_id in client_json:
        client_index += 1
        client_data.append((client_id))
        for period in client_json[client_id]:
            date = period
            attribution = client_json[client_id][period]["attribution"]
            customers = client_json[client_id][period]["customers"]
            cr = client_json[client_id][period]["CR"]
            # Reorder the values
            period_data.append(
                (date, attribution, customers, cr, client_index))
            period_index += 1
            for record_dict in client_json[client_id][period]["records"]:
                source = record_dict["source"]
                source_type = record_dict["source_type"]
                attribution = record_dict["attribution"]
                cr = record_dict["CR"]
                record_data.append(
                    (source, source_type, attribution, cr, period_index))
    return client_data, period_data, record_data
