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

### Backend Setup
- #### Clone this repo into a suitable folder on your local system
  ```
  git clone https://github.com/hhk998402/MEAN-Stack-Demo.git
  ```
- #### Install the required packages
  Note, this step requires that you have NodeJS and NPM installed
  ```
  cd MEAN-Stack-Demo/backend #Navigate into backend folder
  npm install  
  ```
- #### Create a `.env` file within the `backend` folder and paste the following content into it
  ```
  MONGO_DB_URL=(paste-your-mongodb-connection-URI)
  ```
  The URL will be in the following format, with `dummyUserName`, `dummyPassword`, `hostName`, `portNumber`, and `dbName` having to be altered to the URL you get after completing step 3 in the pre-requisites.
  ```
  MONGO_DB_URL=mongodb://dummyUserName:dummyPassword@hostName:portNumber/dbName
  ```
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
- Assuming that you have already `cloned` this repo, (if not go to the first instruction in backend setup), let's proceed with the frontend setup.
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
