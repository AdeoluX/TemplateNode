const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
// const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../repository");


class UserService {
  async getAllUsers(){
    const users = genericRepo.setOptions('User', {
      selectOptions: [
        'email',
        'phone'
      ]
    }).findAll()
    return users
  }
}


module.exports = UserService
