const driver = process.env.DB_DRIVER || "mongoose";

const invoiceRepository =
  driver === "native"
    ? require("./native_driver/invoiceRepository")
    : require("./mongoose/invoiceRepository");

const userRepository =
  driver === "native"
    ? require("./native_driver/userRepository")
    : require("./mongoose/userRepository");

module.exports = { invoiceRepository, userRepository };
