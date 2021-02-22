const jwt = require("jsonwebtoken");
const util = require("util");

const getToken = util.promisify(jwt.sign);
const verifyToken = util.promisify(jwt.verify);

module.exports.getToken = getToken;
module.exports.verifyToken = verifyToken;
