# This is our practice project at Extole that involves big data analisys and visualization
We are very grateful to Extole for the help, workspace, guidance, tea, juice and good mood
## Special thanks to
Ana-Maria\
Alex\
Igor\
Ivan
## [a href](sleepy-pond-18261.pktriot.net)
## Description
This project involves the development of a comprehensive dashboard system designed for referral marketing analysis. The core feature is a secure login page, leading to a data-rich table view that presents key metrics for each client. Clients are companies seeking to expand their referral networks, and the dashboard is tailored to assist in this endeavor. Key metrics include the 'Contribution Rate', which measures the ratio of users invited by the company to the total user base. The system facilitates the process of inviting users through referral marketing strategies.
## Demo
https://youtu.be/LmotuJ33Nm4
## Setup
1. Clone the repo, open the data_analysis folder and put students_data.csv in this folder.
2. ```pip install pandas```\
```pip install jupyterlab```\
```pip install notebook```\
```sudo dnf install sqlite3```\
Also you can install all necessary libraries for the JS app
```npm -i sqlite3```
```npm -i express```
```npm -i react```
4. Check all the paths in the scripts and change them while running them. Sorry.
5. Be sure that you have everything installed, because I might have forgotten something :)
6. Create a ```ClientDB``` folder in the main directory and a ```Clients.db``` file inside it.
7. Open ```database_scripts_py``` folder and run the ```dbpy.ipynb``` or the ```db_main.py``` script
8. Check if the tables are created and the data is inserted.
9. You can look in the ```back``` directory, where is the app.js file and you'll get how to work with the current state of the API
10. Run the app.js and the React App in the ```src``` folder.
## Endpoints
* localhost:PORT/get-all-clients - gives all client ids.
* localhost:PORT/client-data/<client-id> - gives all-time info about a client.
+ /sources - gives all time info about a client's sources.
+ /quarter/<Q1,Q2,Q3,Q4> - gives info about a client by quarter.
+ + /sources - gives info about a client's sources by quarter.
* localhost:PORT/mainmenu - gives the info for the main menu, client_id, cr, differences between CRs.

