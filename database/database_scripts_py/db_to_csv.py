import csv
import sqlite3
from sqlite3 import Error


conn=sqlite3.connect('/home/cristi/Documents/practica/database/ClientDB/Clients.db')
cursor = conn.cursor()
try:
    cursor.execute("SELECT * FROM clients AS c INNER JOIN periods AS p ON c.id = p.client_period_id INNER JOIN records AS r ON r.period_record_id = p.id")
except Error as e:
    print(e)

with open("out.csv", 'w',newline='') as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow([i[0] for i in cursor.description])
    csv_writer.writerows(cursor)
conn.close()

