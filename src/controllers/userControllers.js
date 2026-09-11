const userService = require("../services/userService");

async function login(req, res) {
  const accessToken = await userService.login(
    req.body.username,
    req.body.password,
  );
  res.status(200).json({ accessToken });
}

async function signup(req, res) {
  const user = await userService.signup(req.body);
  res.status(201).json({ message: "User created successfully", user });
}

module.exports = { login, signup };
