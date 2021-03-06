[![Actions Status](https://github.com/hhk998402/MEAN-Stack-Demo/workflows/MEAN%20Stack%20CI/badge.svg)](https://github.com/hhk998402/MEAN-Stack-Demo/actions)
[![codecov](https://codecov.io/gh/hhk998402/MEAN-Stack-Demo/branch/only-CRUD/graph/badge.svg)](https://codecov.io/gh/hhk998402/MEAN-Stack-Demo)
# MEAN-Stack-Demo
MEAN Stack demo application prepared under the guidance of Mydhili K Nair (Professor, Information Science Department, MSRIT).

### Pre-requisites

<ul>
  <li>
    <b>Install NodeJS and NPM</b> on your system. You will find plenty of tutorials on how to do this on YouTube.<br>
    Verify that the installation is successful by executing the following commands from your terminal/CMD.
    <img src="/setup-images/Node-NPM-Setup-Check.png">
  </li><br>
  <li><b>Install Angular-CLI</b></li><br>
  <li>
    Setup a (free) MongoDB instance on 
      <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>
  </li><br>
</ul>

### Backend Setup
- #### Create a `.env` file within the backend folder, and paste the following content into it
  ```
  MONGO_DB_URL=(paste-your-mongodb-connection-URI)
  ```
  The URL will be in the following format, with `dummyUserName`, `dummyPassword`, `hostName`, `portNumber`, and `dbName` having to be altered to the URL you get after completing step 3 in the pre-requisites.
  ```
  MONGO_DB_URL=mongodb://dummyUserName:dummyPassword@hostName:portNumber/dbName
  ```
# MEAN-Stack-Demo
MEAN Stack demo application prepared under the guidance of Mydhili K Nair (Professor, Information Science Department, MSRIT).

### Pre-requisites

<ol>
  <li>
    <b>Install NodeJS and NPM</b> on your system. You will find plenty of tutorials on how to do this on YouTube.<br>
    Verify that the installation is successful by executing the following commands from your terminal/CMD <br> 
    (<code>node -v</code> and <code>npm -v</code> should return version numbers as shown in image below).<br><br>
    <img src="/setup-images/Node-NPM-Setup-Check.png">
  </li><br>
  <li><b>Install Angular-CLI</b>
    <pre>npm install -g @angular/cli</pre>
  </li><br>
  <li>
    Setup a (free) MongoDB instance on 
      <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>
  </li><br>
  <li><b>Install Express-Generator</b>
    <pre>npm install -g express-generator</pre>
  </li><br>
</ol>

### Fetch the Project Code
- #### Clone this repo into a suitable folder on your local system
  ```
  git clone https://github.com/hhk998402/MEAN-Stack-Demo.git
  cd MEAN-Stack-Demo
  ```
- #### `IMPORTANT:` If the `only CRUD` application is to be run, then switch to the `only-CRUD` branch
  ```
  git fetch --all
  git checkout --track origin/only-CRUD
  ```

### Backend Setup
- #### Install the required packages
  Note, this step requires that you have NodeJS and NPM installed
  ```
  cd backend #Navigate into backend folder
  npm install  
  ```
- #### Create a `.env` file within the `backend` folder and paste the following content into it
  - Add MongoDB URL to `.env` file. `Note: Remove the '<' and '>' brackets.`
    ```
    MONGO_DB_URL=<paste-your-mongodb-connection-URI>
    ```
    The URL will be in the following format, with `dummyUserName`, `dummyPassword`, `hostName`, `portNumber`, and `dbName` having to be altered to the URL you get after completing step 3 in the pre-requisites.
    ```
    MONGO_DB_URL=mongodb://dummyUserName:dummyPassword@hostName:portNumber/dbName
    ```
  - Add JWT secret token to `.env` file. This token will be used for signing and verifying your `JSON Web Tokens`. `Note: Remove the '<' and '>' brackets.`
      ```
      SECRET_TOKEN=<enter-your-secret-token-string>
      ```
      As a good practice, make sure the secret token is not a common word/string. Use a random string consisting of alphabets, numbers and special characters.
- #### Start the backend server.
  - Using `npm start`
    ```
    npm start
    ```
  - Using `nodemon`
    ```
    nodemon ./bin/www
    ```
  - The backend server will be running on http://localhost:3000
  
### Frontend Setup
- Assuming that you have already `cloned` this repo, (if not go to the `Fetch the Project Code` section), let's proceed with the frontend setup.
- Note, this step requires that you have `Angular-CLI` installed, if not go to the 2nd pre-requisite instruction.
- #### Install the required packages
  ```
  cd frontend
  npm install
  ```
- #### Start the frontend application
  ```
  ng serve
  ```
  Frontend application should be running on http://localhost:4200
