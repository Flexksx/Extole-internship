# This is our practice project at Extole that involves big data analisys and visualization
We are very grateful to Extole for the help, workspace, guidance, tea, juice and good mood
## Special thanks to
Ana-Maria\
Alex\
Igor\
Some guy whose name I forgot sorry
## Setup
1. Clone the repo, open the data_analysis folder and put students_data.csv in this folder.
2. ```pip install pandas```\
```pip install jupyterlab```\
```pip install notebook```\
``` sudo dnf install sqlite3```
3. Check all the paths in the scripts and change them while running them. Sorry.
4. Be sure that you have everything installed, because I might have forgotten something :)
5. Create a ClientDB folder in the main directory and a Clients.db file inside it.
6. Open database_scripts_py folder and run the dbpy.ipynb script
7. Check if the tables are created and the data is inserted.
8. You can look in the ```back``` directory, where is the app.js file and you'll get how to work with the current state of the API
9. Run the app.js and the React App in the ```src``` folder. 
## Endpoints
* localhost:PORT/get-all-clients - gives all client ids.
* localhost:PORT/client-data/<client-id> - gives all-time info about a client.
+ /sources - gives all time info about a client's sources.
+ /quarter/<Q1,Q2,Q3,Q4> - gives info about a client by quarter.
+ + /sources - gives info about a client's sources by quarter.
* localhost:PORT/mainmenu - gives the info for the main menu, client_id, cr, differences between CRs.

