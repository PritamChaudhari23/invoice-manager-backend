const { getDb } = require("../../config/database_native_driver");

const userRepository = {
  findByUsername(username) {
    const db = getDb();
    return db.collection("users").findOne({ username });
  },

  findByEmailOrUsername(email, username) {
    const db = getDb();
    return db.collection("users").findOne({
      $or: [{ email }, { username }],
    });
  },

  create(user) {
    const db = getDb();
    return db.collection("users").insertOne(user);
  },
};

module.exports = userRepository;
