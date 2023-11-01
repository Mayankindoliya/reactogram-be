const Users = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt')


class usersControllers {

  static async signUpUsers(document) {
    // Check if a user with the same email or full name already exists
    const existingUser = await Users.findOne({$or: [{email: document.email}, {fullName: document.fullName}]}).lean()
    if(existingUser) {
      throw new Error("user is Already Registered.")
    }
    // Generate a salt and hash the user's password with bcrypt
    const salt = bcrypt.genSaltSync(10) 
    const hashedPassword = bcrypt.hashSync(document.password, salt)
    document.password = hashedPassword
    // Create the user with the hashed password
    // const user = await Users.create({ fullName: document.fullName, email: document.email, password: document.password })
    const user = await Users.create(document)
    if(!user) {
      throw new Error("Failed to register user.")
    }
    return user
  };

  static async loginUsers (document) {
    const user = await Users.findOne({email: document.email}, 'password fullName').lean()
    // check if the user exists or not:
    if(!user) {
      throw new Error('User not found')
    }
    if(!bcrypt.compareSync(document.password, user.password)) {
      throw new Error('password not matched')
    }
     const token = jwt.createJwt({_id: user._id})
     return {token, user: {_id: user._id,  fullName: user.fullName}}
  };


};

module.exports = usersControllers;