const catchAsync = require("../utils/catchAsync");
const UserService = require("../services/user.service");
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

class UserController{
  getAllUser = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const create = await (new UserService).getAllUsers();
    return successResponse(res, create);
  });
}


module.exports = UserController
