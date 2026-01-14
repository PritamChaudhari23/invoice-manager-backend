require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userRepository = require("../repositories/userRepository");

class UserService {
  async login(username, password) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid credentials");
    }

    const payload = { username: user.username, id: user._id };
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
  }

  async signup(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User({
      name: data.name,
      surname: data.surname,
      email: data.email,
      username: data.username,
      password: hashedPassword,
    });

    return userRepository.createUser(user);
  }
}

module.exports = new UserService();
