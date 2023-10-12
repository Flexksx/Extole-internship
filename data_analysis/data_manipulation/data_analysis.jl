using CSV
using DataFrames
using SQLite
using QuerySQLite

db_path = "database/ClientDB/Clients.db"
db = SQLite.DB(db_path)

query = """
SELECT * FROM clients
"""

try
    result = SQLite.execute(db, query)
    for row in result
        println(row)
    end
catch e
    println("Error: ", e)
end

SQLite.close(db)
