# MEAN-Stack-Demo
MEAN Stack demo application prepared under the guidance of Mydhili K Nair (Professor, Information Science Department, MSRIT).

### Pre-requisites

<ul>
  <li>
    <b>Install NodeJS and NPM</b> on your system. You will find plenty of tutorials on how to do this on YouTube.<br>
    Verify that the installation is successful by executing the following commands from your terminal/CMD.
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
