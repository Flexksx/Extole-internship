const fs = require('fs');

function load_data_from_json(file_path) {
    let client_data = [];
    let period_data = [];
    let record_data = [];
    let client_index = 0;
    let period_index = 0;
    let data = fs.readFileSync(file_path);
    let client_json = JSON.parse(data);

    for (let client_id in client_json) {
        client_index += 1;
        client_data.push(client_id);
        for (let period in client_json[client_id]) {
            let date = period;
            let attribution = client_json[client_id][period]["attribution"];
            let customers = client_json[client_id][period]["customers"];
            let cr = client_json[client_id][period]["CR"];
            // Reorder the values
            period_data.push(
                [date, attribution, customers, cr, client_index]
            );
            period_index += 1;
            for (let record_dict of client_json[client_id][period]["records"]) {
                let source = record_dict["source"];
                let source_type = record_dict["source_type"];
                let attribution = record_dict["attribution"];
                let cr = record_dict["CR"];
                record_data.push(
                    [source, source_type, attribution, cr, period_index]
                );
            }
        }
    }
    return [client_data, period_data, record_data];
}

// Example usage
const [client_data, period_data, record_data] = load_data_from_json('/home/cristi/Documents/practica/data_analysis/data _aggregation/clients_per_day.json');
console.log('Client Data:', client_data);
console.log('Period Data:', period_data);
console.log('Record Data:', record_data);
