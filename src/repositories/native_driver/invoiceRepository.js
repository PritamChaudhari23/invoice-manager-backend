const mongodb = require("mongodb");
const { getDb } = require("../../config/database_native_driver");
const AppError = require("../../utils/AppError");

function assertValidId(id) {
  if (!mongodb.ObjectId.isValid(id)) {
    throw new AppError("Invalid invoice ID", 400);
  }
}

const invoiceRepository = {
  create(invoice) {
    const db = getDb();
    return db.collection("invoices").insertOne(invoice);
  },

  findAll() {
    const db = getDb();
    return db.collection("invoices").find().toArray();
  },

  findById(id) {
    assertValidId(id);
    const db = getDb();
    return db.collection("invoices").findOne({ _id: new mongodb.ObjectId(id) });
  },

  updateById(id, invoice) {
    assertValidId(id);
    const { id: _, ...data } = invoice;
    const db = getDb();
    return db
      .collection("invoices")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: data });
  },

  deleteById(id) {
    assertValidId(id);
    const db = getDb();
    return db
      .collection("invoices")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  },
};

module.exports = invoiceRepository;
