const roles = {
    STUDENT : {
        name: "STUDENT",
        condition: null,
        model: require("../models/Student.js")
    },
    OWN : {
        name: "OWN",
        condition: (idFromToken, idFromBody) => {
            // console.log("ID1" , idFromToken);
            // console.log("ID2" , idFromBody);
            return(idFromToken.toLowerCase() === idFromBody.toLowerCase());
        }
    },
    ADMIN : {
        name: "ADMIN",
        condition: null,
        model: require('../models/Admin.js')
    }
};

module.exports = {
    roles
};