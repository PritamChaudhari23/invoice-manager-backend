const getDb = require("../config/database").getDb;

const userRepository = {
  findByUsername: async (username) => {
    const db = getDb();
    return db.collection("users").findOne({ username });
  },

  createUser: async (user) => {
    const db = getDb();
    return db.collection("users").insertOne(user);
  },
};

module.exports = userRepository;
