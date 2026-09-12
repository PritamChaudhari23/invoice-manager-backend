const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/mongoose/userRepository");
const AppError = require("../utils/AppError");

const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = "1h";

class UserService {
  async login(username, password) {
    if (!username || !password) {
      throw new AppError("Username and password are required", 400);
    }

    const user = await userRepository.findByUsername(username);
    // Same message for unknown user and bad password so the response doesn't reveal which accounts exist.
    if (!user) throw new AppError("Invalid credentials", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError("Invalid credentials", 401);

    return jwt.sign(
      { id: user._id, username: user.username },
      process.env.TOKEN_SECRET,
      { expiresIn: TOKEN_EXPIRY },
    );
  }

  async signup({ name, surname, email, username, password }) {
    if (!password) {
      throw new AppError("Password is required", 400);
    }

    const existing = await userRepository.findByEmailOrUsername(
      email,
      username,
    );
    if (existing) throw new AppError("Email or username already exists", 409);

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userRepository.create({
      name,
      surname,
      email,
      username,
      password: hashedPassword,
    });

    return { id: user._id, username: user.username, email: user.email };
  }
}

module.exports = new UserService();
