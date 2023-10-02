const catchAsync = require("../utils/catchAsync");
const AuthenticationService = require("../services/authentication.service");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

class AuthenticationController{
  signUp = catchAsync(async (req, res, next) => {
    const login = await (new AuthenticationService).signUp(req.body);
    return successResponse(res, login);
  });

  signIn = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const signUp = await (new AuthenticationService).signIn(req.body);
    return successResponse(res, signUp);
  });
}


module.exports = AuthenticationController
