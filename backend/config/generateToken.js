const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    const token ="pankaj";
    return jwt.sign({id},token,{
        expiresIn:"10d",
    });
};

module.exports = generateToken;