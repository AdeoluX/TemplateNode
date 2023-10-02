const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');
const { verifyToken } = require('../utils/tokenManagement');
const { abort } = require('process');

const verify  = (role) => (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    abortIf(!token || token == '', httpStatus.FORBIDDEN, 'You shall not pass');
    const data = verifyToken(token);
    abortIf(!data, httpStatus.FORBIDDEN, 'You shall not pass');
    abortIf(!role.includes(data.role), httpStatus.FORBIDDEN, 'You shall not pass')
    const id = data.id;
    res.locals.user = data;
    next();
};

module.exports = {
    verify
};
