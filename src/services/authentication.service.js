const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
// const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../repository");


class AuthenticationService {
  async signIn(){
    const users = genericRepo.setOptions('User', {
      selectOptions: [
        'email',
        'phone'
      ]
    }).findAll()
    return users
  }

  async signUp(){
    const users = genericRepo.setOptions('User', {
      selectOptions: [
        'email',
        'phone'
      ]
    }).findAll()
    return users
  }
}


module.exports = AuthenticationService
