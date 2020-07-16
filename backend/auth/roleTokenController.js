const bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 15; //Default used by bcrypt is 10, we can specify another value here

const generateRoleToken = async(user) => {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    return(bcrypt.hash(user.permission.level, salt));
}

module.exports = {
    generateRoleToken
};