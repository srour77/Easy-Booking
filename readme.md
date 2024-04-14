## Brief
### Backned API for bus reservation application, enabling users to book thier bus trips in a quick, secured and satisfying way.

## How To Run
1. run `npm install` on your terminal to install project dependencies
2. make sure that you have a `SQLSERVER` instance running on your machine
3. edit the `.env` file with your database credentials
* ```DB_NAME```: database name
* ```DB_PORT```: database port, default to `1433`
* ```DB_USER```: your username to login to `SQLSERVER`
* ```DB_PASS```: your password to login to `SQLSERVER`
4. PS: all env variables prefixed with `EAMIL` are just for testing email features(verify email, reset password, ...etc)

## Technologies Used
* Language: `Javascript` (`Typescript`)
* Runtime Environment: `NodeJs`
* Framework: `ExpressJs`
* Database: `SQLSERVER`
* ORM: `Sequelize`


## POSTMAN Collection
[click here](https://www.postman.com/orbital-module-geologist-49437711/workspace/public-workspace/collection/25071677-a28f7297-ee27-4d11-81e0-6d616b65e2bb?action=share&creator=25071677)