const roles = {
    STUDENT : {
        name: "STUDENT",
        condition: (req) => {
            return(req.user.role.toUpperCase() === "STUDENT");
        }
    },
    OWN : {
        name: "OWN",
        condition: (req) => {
            return(req.user._id.toLowerCase() === req.params._id.toLowerCase());
        }
    },
    ADMIN : {
        name: "ADMIN",
        condition: (req) => {
            return(req.user.role.toUpperCase() === "ADMIN");
        }
    }
};

module.exports = {
    roles
};