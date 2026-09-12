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

  async create(user) {
    const db = getDb();
    const result = await db.collection("users").insertOne(user);
    return { _id: result.insertedId, ...user };
  },
};

module.exports = userRepository;
