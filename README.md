# hackmit flask workshop
Workshop designed to teach how to build a basic REST api with flask.

## Usage
Progress in the workshop is divided into different branches starting from `step-1`. Begin with the client starter code by running `git checkout step-1`. To reset progress and checkout `step-x`, run 
```bash
git reset --hard
git checkout step-x
```	
The table describes the content of each step:
|branch| content|
|--|--|
| `step-1` | client starter code |
| `step-2` | hello world endpoint |
| `step-3` | client-server connection and remaining endpoints|
|`step-4` | database integration |

## Installations and Startup

### Client
Note this project was created with node version `14.18.1`.
To install client dependencies and start client, run in a separate terminal
```bash
cd client
yarn install
yarn run dev
```

### Server
First create a virtual environment, install dependencies, and start the server with 
```bash
cd server
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
flask run
```
Note that you may need to reinstall dependencies as new modules are added. 

At `step-3` create a postgreSQL database called `tweeter`. Then to configure the database connection, create a `/server/.env` file with 
```
SQLALCHEMY_DATABASE_URI = "postgresql://localhost/tweeter"
```
After the models are made, initialize the tables by opening the `flask shell` in the virtual environment and running `db.create_all()`. 
